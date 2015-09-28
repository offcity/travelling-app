#!/bin/sh
set -e

mkdir -p "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"

RESOURCES_TO_COPY=${PODS_ROOT}/resources-to-copy-${TARGETNAME}.txt
> "$RESOURCES_TO_COPY"

XCASSET_FILES=()

realpath() {
  DIRECTORY="$(cd "${1%/*}" && pwd)"
  FILENAME="${1##*/}"
  echo "$DIRECTORY/$FILENAME"
}

install_resource()
{
  case $1 in
    *.storyboard)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --output-format human-readable-text --compile ${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$1\" .storyboard`.storyboardc ${PODS_ROOT}/$1 --sdk ${SDKROOT}"
      ibtool --reference-external-strings-file --errors --warnings --notices --output-format human-readable-text --compile "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$1\" .storyboard`.storyboardc" "${PODS_ROOT}/$1" --sdk "${SDKROOT}"
      ;;
    *.xib)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --output-format human-readable-text --compile ${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$1\" .xib`.nib ${PODS_ROOT}/$1 --sdk ${SDKROOT}"
      ibtool --reference-external-strings-file --errors --warnings --notices --output-format human-readable-text --compile "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$1\" .xib`.nib" "${PODS_ROOT}/$1" --sdk "${SDKROOT}"
      ;;
    *.framework)
      echo "mkdir -p ${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      mkdir -p "${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      echo "rsync -av ${PODS_ROOT}/$1 ${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      rsync -av "${PODS_ROOT}/$1" "${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      ;;
    *.xcdatamodel)
      echo "xcrun momc \"${PODS_ROOT}/$1\" \"${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1"`.mom\""
      xcrun momc "${PODS_ROOT}/$1" "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1" .xcdatamodel`.mom"
      ;;
    *.xcdatamodeld)
      echo "xcrun momc \"${PODS_ROOT}/$1\" \"${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1" .xcdatamodeld`.momd\""
      xcrun momc "${PODS_ROOT}/$1" "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1" .xcdatamodeld`.momd"
      ;;
    *.xcmappingmodel)
      echo "xcrun mapc \"${PODS_ROOT}/$1\" \"${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1" .xcmappingmodel`.cdm\""
      xcrun mapc "${PODS_ROOT}/$1" "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$1" .xcmappingmodel`.cdm"
      ;;
    *.xcassets)
      ABSOLUTE_XCASSET_FILE=$(realpath "${PODS_ROOT}/$1")
      XCASSET_FILES+=("$ABSOLUTE_XCASSET_FILE")
      ;;
    /*)
      echo "$1"
      echo "$1" >> "$RESOURCES_TO_COPY"
      ;;
    *)
      echo "${PODS_ROOT}/$1"
      echo "${PODS_ROOT}/$1" >> "$RESOURCES_TO_COPY"
      ;;
  esac
}
if [[ "$CONFIGURATION" == "Debug" ]]; then
  install_resource "DateTools/DateTools/DateTools.bundle"
  install_resource "../../LeanChatLib/Resources/AddGroupMemberBtn@2x.png"
  install_resource "../../LeanChatLib/Resources/AddGroupMemberBtnHL@2x.png"
  install_resource "../../LeanChatLib/Resources/avator@2x.png"
  install_resource "../../LeanChatLib/Resources/CellBlueSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellGraySelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellNotSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellRedSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_friend@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_newmessage@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_photo@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_scan@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_voip@2x.png"
  install_resource "../../LeanChatLib/Resources/ContactsPanelDotRect@2x.png"
  install_resource "../../LeanChatLib/Resources/defaultSettings.plist"
  install_resource "../../LeanChatLib/Resources/face@2x.png"
  install_resource "../../LeanChatLib/Resources/face_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/Fav_Cell_Loc@2x.png"
  install_resource "../../LeanChatLib/Resources/group_icon.png"
  install_resource "../../LeanChatLib/Resources/input-bar-background.png"
  install_resource "../../LeanChatLib/Resources/input-bar-background@2x.png"
  install_resource "../../LeanChatLib/Resources/input-bar-flat.png"
  install_resource "../../LeanChatLib/Resources/input-bar-flat@2x.png"
  install_resource "../../LeanChatLib/Resources/input-field-cover.png"
  install_resource "../../LeanChatLib/Resources/input-field-cover@2x.png"
  install_resource "../../LeanChatLib/Resources/keyborad@2x.png"
  install_resource "../../LeanChatLib/Resources/keyborad_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/loudReceive.caf"
  install_resource "../../LeanChatLib/Resources/messageSendFail@2x.png"
  install_resource "../../LeanChatLib/Resources/MessageVideoPlay@2x.png"
  install_resource "../../LeanChatLib/Resources/MoreFunctionFrame@2x.png"
  install_resource "../../LeanChatLib/Resources/msg_chat_voice_unread.png"
  install_resource "../../LeanChatLib/Resources/msg_chat_voice_unread@2x.png"
  install_resource "../../LeanChatLib/Resources/multiMedia@2x.png"
  install_resource "../../LeanChatLib/Resources/multiMedia_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/MultiSelectedPanelBkg@2x.png"
  install_resource "../../LeanChatLib/Resources/MultiSelectedPanelConfirmBtnbKG@2x.png"
  install_resource "../../LeanChatLib/Resources/placeholderImage@2x.png"
  install_resource "../../LeanChatLib/Resources/receive.caf"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying000@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying001@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying002@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying003@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordCancel@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingBkg@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal001@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal002@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal003@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal004@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal005@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal006@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal007@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal008@2x.png"
  install_resource "../../LeanChatLib/Resources/SearchIcon@2x.png"
  install_resource "../../LeanChatLib/Resources/send.caf"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying000@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying001@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying002@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying003@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_friendcard@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_location@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_myfav@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_openapi@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_pic@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_video@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_videovoip@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_voiceinput@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_voipvoice@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_wxtalk@2x.png"
  install_resource "../../LeanChatLib/Resources/voice@2x.png"
  install_resource "../../LeanChatLib/Resources/voice_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/VoiceBtn_Black@2x.png"
  install_resource "../../LeanChatLib/Resources/VoiceBtn_BlackHL@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_Cavern@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_LeanChat@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_Solid@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_Cavern@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_LeanChat@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_Solid@2x.png"
  install_resource "../../LeanChatLib/Resources/emoticons"
  install_resource "../../LeanChatLib/Resources/en.lproj"
  install_resource "../../LeanChatLib/Resources/SECoreTextView.bundle"
  install_resource "../../LeanChatLib/Resources/zh-Hans.lproj"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_add_image@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_back@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_bg_1@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_bg_2@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_btn@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_btn_new@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_warning@2x.png"
  install_resource "iRate/iRate/iRate.bundle"
  install_resource "iVersion/iVersion/iVersion.bundle"
  install_resource "${BUILT_PRODUCTS_DIR}/JSBadgeView.bundle"
fi
if [[ "$CONFIGURATION" == "Release" ]]; then
  install_resource "DateTools/DateTools/DateTools.bundle"
  install_resource "../../LeanChatLib/Resources/AddGroupMemberBtn@2x.png"
  install_resource "../../LeanChatLib/Resources/AddGroupMemberBtnHL@2x.png"
  install_resource "../../LeanChatLib/Resources/avator@2x.png"
  install_resource "../../LeanChatLib/Resources/CellBlueSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellGraySelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellNotSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/CellRedSelected@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_friend@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_newmessage@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_photo@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_scan@2x.png"
  install_resource "../../LeanChatLib/Resources/contacts_add_voip@2x.png"
  install_resource "../../LeanChatLib/Resources/ContactsPanelDotRect@2x.png"
  install_resource "../../LeanChatLib/Resources/defaultSettings.plist"
  install_resource "../../LeanChatLib/Resources/face@2x.png"
  install_resource "../../LeanChatLib/Resources/face_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/Fav_Cell_Loc@2x.png"
  install_resource "../../LeanChatLib/Resources/group_icon.png"
  install_resource "../../LeanChatLib/Resources/input-bar-background.png"
  install_resource "../../LeanChatLib/Resources/input-bar-background@2x.png"
  install_resource "../../LeanChatLib/Resources/input-bar-flat.png"
  install_resource "../../LeanChatLib/Resources/input-bar-flat@2x.png"
  install_resource "../../LeanChatLib/Resources/input-field-cover.png"
  install_resource "../../LeanChatLib/Resources/input-field-cover@2x.png"
  install_resource "../../LeanChatLib/Resources/keyborad@2x.png"
  install_resource "../../LeanChatLib/Resources/keyborad_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/loudReceive.caf"
  install_resource "../../LeanChatLib/Resources/messageSendFail@2x.png"
  install_resource "../../LeanChatLib/Resources/MessageVideoPlay@2x.png"
  install_resource "../../LeanChatLib/Resources/MoreFunctionFrame@2x.png"
  install_resource "../../LeanChatLib/Resources/msg_chat_voice_unread.png"
  install_resource "../../LeanChatLib/Resources/msg_chat_voice_unread@2x.png"
  install_resource "../../LeanChatLib/Resources/multiMedia@2x.png"
  install_resource "../../LeanChatLib/Resources/multiMedia_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/MultiSelectedPanelBkg@2x.png"
  install_resource "../../LeanChatLib/Resources/MultiSelectedPanelConfirmBtnbKG@2x.png"
  install_resource "../../LeanChatLib/Resources/placeholderImage@2x.png"
  install_resource "../../LeanChatLib/Resources/receive.caf"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying000@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying001@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying002@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying003@2x.png"
  install_resource "../../LeanChatLib/Resources/ReceiverVoiceNodePlaying@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordCancel@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingBkg@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal001@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal002@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal003@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal004@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal005@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal006@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal007@2x.png"
  install_resource "../../LeanChatLib/Resources/RecordingSignal008@2x.png"
  install_resource "../../LeanChatLib/Resources/SearchIcon@2x.png"
  install_resource "../../LeanChatLib/Resources/send.caf"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying000@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying001@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying002@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying003@2x.png"
  install_resource "../../LeanChatLib/Resources/SenderVoiceNodePlaying@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_friendcard@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_location@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_myfav@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_openapi@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_pic@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_video@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_videovoip@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_voiceinput@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_voipvoice@2x.png"
  install_resource "../../LeanChatLib/Resources/sharemore_wxtalk@2x.png"
  install_resource "../../LeanChatLib/Resources/voice@2x.png"
  install_resource "../../LeanChatLib/Resources/voice_HL@2x.png"
  install_resource "../../LeanChatLib/Resources/VoiceBtn_Black@2x.png"
  install_resource "../../LeanChatLib/Resources/VoiceBtn_BlackHL@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_Cavern@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_LeanChat@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Receiving_Solid@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_Cavern@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_LeanChat@2x.png"
  install_resource "../../LeanChatLib/Resources/weChatBubble_Sending_Solid@2x.png"
  install_resource "../../LeanChatLib/Resources/emoticons"
  install_resource "../../LeanChatLib/Resources/en.lproj"
  install_resource "../../LeanChatLib/Resources/SECoreTextView.bundle"
  install_resource "../../LeanChatLib/Resources/zh-Hans.lproj"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_add_image@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_back@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_bg_1@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_bg_2@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_btn@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_btn_new@2x.png"
  install_resource "LeanCloudFeedback/LeanCloudFeedback/resources/feedback_warning@2x.png"
  install_resource "iRate/iRate/iRate.bundle"
  install_resource "iVersion/iVersion/iVersion.bundle"
  install_resource "${BUILT_PRODUCTS_DIR}/JSBadgeView.bundle"
fi

mkdir -p "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
if [[ "${ACTION}" == "install" ]]; then
  mkdir -p "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
  rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
fi
rm -f "$RESOURCES_TO_COPY"

if [[ -n "${WRAPPER_EXTENSION}" ]] && [ "`xcrun --find actool`" ] && [ -n "$XCASSET_FILES" ]
then
  case "${TARGETED_DEVICE_FAMILY}" in
    1,2)
      TARGET_DEVICE_ARGS="--target-device ipad --target-device iphone"
      ;;
    1)
      TARGET_DEVICE_ARGS="--target-device iphone"
      ;;
    2)
      TARGET_DEVICE_ARGS="--target-device ipad"
      ;;
    *)
      TARGET_DEVICE_ARGS="--target-device mac"
      ;;
  esac

  # Find all other xcassets (this unfortunately includes those of path pods and other targets).
  OTHER_XCASSETS=$(find "$PWD" -iname "*.xcassets" -type d)
  while read line; do
    if [[ $line != "`realpath $PODS_ROOT`*" ]]; then
      XCASSET_FILES+=("$line")
    fi
  done <<<"$OTHER_XCASSETS"

  printf "%s\0" "${XCASSET_FILES[@]}" | xargs -0 xcrun actool --output-format human-readable-text --notices --warnings --platform "${PLATFORM_NAME}" --minimum-deployment-target "${IPHONEOS_DEPLOYMENT_TARGET}" ${TARGET_DEVICE_ARGS} --compress-pngs --compile "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
fi
