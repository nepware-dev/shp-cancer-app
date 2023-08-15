import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

import {QuestionnaireItem} from 'components/QuestionnaireItem';

import COLORS from 'utils/colors';
import {setAnswer} from 'store/slices/questionnaire';

import styles from './styles';

interface Attachment {
  contentType: string;
  url: string;
  size: number;
  creation?: string;
  width?: number;
  height?: number;
}

interface AttachmentInputProps {
  item: QuestionnaireItem;
}

const AttachmentItem = ({
  item,
  onRemove,
}: {
  item: Attachment;
  onRemove: () => void;
}) => {
  return (
    <View style={styles.attachmentItem}>
      <Image source={{uri: item.url}} style={styles.attachmentImage} />
      <TouchableOpacity style={styles.removeIcon} onPress={onRemove}>
        <AntDesignIcon name="closecircle" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const AttachmentInput = (props: AttachmentInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const label = useMemo(
    () =>
      (item.text || item.linkId.replace(/-/g, ' ')) +
      (item.required ? '*' : ''),
    [item],
  );

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleAddAttachmentPress = useCallback(() => {
    ImageCropPicker.openPicker({cropping: true}).then(image => {
      const creationDate = image.creationDate
        ? image.creationDate
        : image.modificationDate;
      const attachmentItem = {
        contentType: image.mime,
        url: image.path,
        size: image.size,
        width: image.width,
        height: image.height,
        creation: creationDate
          ? new Date(Number(creationDate)).toISOString()
          : undefined,
      };
      setAttachments([attachmentItem]);
      dispatch(
        setAnswer({
          linkId: item.linkId,
          answer: {
            valueAttachment: attachmentItem,
          },
        }),
      );
    });
  }, [item, dispatch]);

  const handleRemoveAttachment = useCallback(() => {
    setAttachments([]);
    dispatch(setAnswer({linkId: item.linkId, answer: null}));
  }, [item, dispatch]);

  const renderAttachmentItem = useCallback(
    (listProps: any) => (
      <AttachmentItem {...listProps} onRemove={handleRemoveAttachment} />
    ),
    [handleRemoveAttachment],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <FlatList
        data={attachments}
        contentContainerStyle={styles.attachmentsContainer}
        horizontal
        renderItem={renderAttachmentItem}
        ListFooterComponent={
          attachments.length === 0 ? (
            <TouchableOpacity
              style={styles.addIconContainer}
              onPress={handleAddAttachmentPress}>
              <Icon name="plus" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default AttachmentInput;
