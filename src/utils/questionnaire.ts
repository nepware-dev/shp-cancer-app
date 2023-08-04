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

export const createResponseJSON = (
  questionnaireItemMap: any,
  questionnaire: any,
) => {
  const createItems = (items: any[]) => {
    const newItems: any[] = [];

    if (items) {
      items.forEach(item => {
        const itemDetails = questionnaireItemMap[item.linkId];

        if (item.type !== 'display') {
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
