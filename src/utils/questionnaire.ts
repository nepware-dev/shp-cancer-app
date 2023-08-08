// @ts-nocheck

// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// Some of the code contained in this file has been changed from the original so as
// to suit the needs of Questionnaire forms used for this application.

import cloneDeep from 'lodash.clonedeep';

const traverseItem = (item: any, questionnaireItemMap: any) => {
  questionnaireItemMap[item.linkId] = {
    ...item,
    done: item.type === 'display' || !item.required,
    answer: item.type !== 'display' && item.type !== 'group' ? null : undefined,
    type: item.type || 'ignore',
    required: item.required || false,
  };

  if (item.item) {
    item.item.forEach((subItem: any) =>
      traverseItem(subItem, questionnaireItemMap),
    );
  }
};

export const generateQuestionnaireItemMap = (questionnaire: any) => {
  const questionnaireItemMap = {};

  if (questionnaire.item) {
    questionnaire.item.forEach((subItem: any) => {
      return traverseItem(subItem, questionnaireItemMap);
    });
  }

  return questionnaireItemMap;
};

const operators = {
  EXISTS: 'exists',
  EQUALS: '=',
  UNEQUAL: '!=',
  STRICT_GREATER: '>',
  STRICT_LESS: '<',
  GREATER_OR_EQUAL: '>=',
  LESS_OR_EQUAL: '<=',
};

const getEnableWhenAnswerType = (condition: Record<string, any>) =>
  Object.keys(condition).filter(key => key.startsWith('answer'))[0];

const codingEquals = (coding1: any, coding2: any) => {
  if (coding1 && coding2) {
    return (
      (coding1.system &&
        coding1.code &&
        coding2.system &&
        coding2.code &&
        coding1.system === coding2.system &&
        coding1.code === coding2.code) ||
      coding1.display === coding2.display
    );
  }
  return false;
};

const answerSatisfiesCondition = (
  condition: Record<string, any>,
  question: any,
) => {
  const answerType = getEnableWhenAnswerType(condition);
  const valueType = answerType.replace('answer', 'value');
  switch (condition.operator) {
    // check if any answer exists (only for boolean types)
    case operators.EXISTS: {
      return question.answer?.length > 0;
    }
    // check for equality
    case operators.EQUALS: {
      if (answerType === 'answerCoding') {
        return (
          question.answer?.findIndex((it: any) =>
            codingEquals(it.valueCoding, condition.answerCoding),
          ) >= 0
        );
      }
      return (
        question.answer?.findIndex(
          (it: any) => it[valueType] === condition[answerType],
        ) >= 0
      );
    }
    // check for inequality
    case operators.UNEQUAL: {
      if (answerType === 'answerCoding') {
        return !question.answer?.find(it =>
          codingEquals(it.valueCoding, condition.answerCoding),
        );
      }
      return !question.answer?.find(
        (it: any) => it[valueType] === condition[answerType],
      );
    }
    // check if strict greater
    case operators.STRICT_GREATER: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it: any) =>
            new Date(it[valueType]) > new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it: any) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) >
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(it => it[valueType] > condition[answerType]);
    }
    // check if strict less
    case operators.STRICT_LESS: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it: any) =>
            new Date(it[valueType]) < new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it: any) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) <
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it: any) => it[valueType] < condition[answerType],
      );
    }
    // check if greater or equal
    case operators.GREATER_OR_EQUAL: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it: any) =>
            new Date(it[valueType]) >= new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find(it => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) >=
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it: any) => it[valueType] >= condition[answerType],
      );
    }
    // check if less or equal
    case operators.LESS_OR_EQUAL: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it: any) =>
            new Date(it[valueType]) <= new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it: any) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) <=
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it: any) => it[valueType] <= condition[answerType],
      );
    }
  }
};

export const checkConditionsOfSingleItem = (
  item: any,
  questionnaireItemMap: any,
) => {
  // if item is supposed to be hidden
  const hiddenExtension = item.extension?.find(
    (it: any) =>
      it.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
  );
  if (hiddenExtension && hiddenExtension.valueBoolean === true) {
    return false;
  }
  if (item.enableWhen?.length) {
    return !item.enableBehavior || item.enableBehavior === 'all'
      ? // all conditions must be met
        item.enableWhen.every((condition: any) =>
          answerSatisfiesCondition(
            condition,
            questionnaireItemMap?.[condition.question],
          ),
        )
      : // at least one condition must be met
        item.enableWhen.some((condition: any) =>
          answerSatisfiesCondition(
            condition,
            questionnaireItemMap?.[condition.question],
          ),
        );
  }
  return !!item;
};

export const checkCompletionStateOfItems: any = (items: any, itemMap: any) => {
  // no items: nothing to check
  if (!items.length) {
    return true;
  }
  let completed;

  // if the item is of type 'ignore' or 'display', or is not required, then it is completed by default
  // also if it is a conditional question and it is not displayed, it also counts as completed
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      item.type === 'ignore' ||
      item.type === 'display' ||
      !item.required ||
      !checkConditionsOfSingleItem(item, itemMap)
    ) {
      completed = true;
    } else {
      // when it is a 'group' then it can't have (an) answer(s)
      completed =
        (item.type === 'group' ||
          // otherwise it must have an answer
          itemMap[item.linkId].answer !== null) &&
        // if child items exist, check those
        checkCompletionStateOfItems(item.item ?? [], itemMap);
    }
    // if a single item was found that is not completed, immediately return false
    if (!completed) {
      return false;
    }
  }

  return completed;
};

export const createResponseJSON = (
  questionnaireItemMap: any,
  questionnaire: any,
) => {
  const createItems = (items: any[]) => {
    const newItems: any[] = [];

    if (items) {
      items.forEach(item => {
        const itemDetails = questionnaireItemMap[item.linkId];

        if (
          item.type !== 'display' &&
          checkConditionsOfSingleItem(item, questionnaireItemMap)
        ) {
          const newItem: Record<string, any> = {
            linkId: item.linkId,
            text: item.text,
            answer: itemDetails.answer,
          };

          if (item.item) {
            if (item.type === 'group') {
              newItem.item = createItems(item.item);
            } else {
              newItem.answer[0].item = createItems(item.item);
            }
          }
          newItems.push(newItem);
        }
      });
    }
    return newItems;
  };

  const cleanItem = (rootItem: any) => {
    if (Array.isArray(rootItem)) {
      const newRootItem: any[] = [];
      rootItem.forEach(item => {
        if (cleanItem(item)) {
          newRootItem.push(item);
        }
      });
      rootItem = [...newRootItem];
      return rootItem.length > 0;
    }

    if (typeof rootItem === 'string' || rootItem instanceof String) {
      return rootItem && rootItem.length && rootItem !== 'NaN-NaN-NaN';
    }

    if (
      (typeof rootItem === 'object' || typeof rootItem === 'function') &&
      rootItem !== null
    ) {
      let hasProperties = false;

      Object.keys(rootItem).forEach((key: string) => {
        if (Object.prototype.hasOwnProperty.call(rootItem, key)) {
          if (!cleanItem(rootItem[key])) {
            delete rootItem[key];
          } else {
            hasProperties = true;
          }
        }
      });

      if (rootItem.linkId) {
        return rootItem.item || rootItem.answer ? hasProperties : false;
      }
      return hasProperties;
    }
    return (
      rootItem !== undefined && rootItem !== null && !Number.isNaN(rootItem)
    );
  };

  const questionnaireResponse = {
    authored: new Date().toISOString(),
    item: createItems(questionnaire?.item || []),
    resourceType: 'QuestionnaireResponse',
    questionnaire: `${questionnaire.url}`,
    status: 'completed',
  };

  cleanItem(questionnaireResponse.item);

  return questionnaireResponse;
};

export const checkQuestionnaireStatus: any = (
  linkId: any,
  items: any[],
  itemMap: any,
) => {
  // check if the item is a child of a subgroup
  let newItemMap;
  if (linkId.length) {
    let status;
    if (items) {
      // check the completion state of the group to which the item (identified by the linkId ) belongs
      status = checkCompletionStateOfItems(items, itemMap);
    } else {
      status = !!itemMap[linkId].answer || itemMap[linkId].type === 'display';
    }
    newItemMap = {
      ...cloneDeep(itemMap),
      [linkId]: {
        ...itemMap[linkId],
        done: status,
      },
    };

    // get linkId of parent item
    const parentLinkId = linkId.substring(0, linkId.lastIndexOf('.'));
    // when linkId is not valid, return
    if (!parentLinkId) {
      return newItemMap;
    }
    return checkQuestionnaireStatus(
      parentLinkId,
      newItemMap[parentLinkId].item,
      newItemMap,
    );
  }
  return itemMap;
};
