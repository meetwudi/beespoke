import {
  CardHeading,
  CardList,
  EmojiSmile,
  Palette,
  QuestionCircle,
  Translate,
  Braces,
  Globe,
  ChatText,
  Spellcheck,
} from 'react-bootstrap-icons'
import { getPreferredLanguage } from '../../config/language.mjs'

export const SelectionInteraction = {
  CONVERSATION: 'conversation',
  CHANGE_SELECTION: 'change-selection',
}

const createGenPrompt =
  ({
    message = '',
    isTranslation = false,
    targetLanguage = '',
    enableBidirectional = false,
    includeLanguagePrefix = false,
  }) =>
  async (selection) => {
    let preferredLanguage = targetLanguage

    if (!preferredLanguage) {
      preferredLanguage = await getPreferredLanguage()
    }

    let fullMessage = isTranslation
      ? `Translate the following into ${preferredLanguage} and only show me the translated content`
      : message
    if (enableBidirectional) {
      fullMessage += `. If it is already in ${preferredLanguage}, translate it into English and only show me the translated content`
    }
    const prefix = includeLanguagePrefix ? `Reply in ${preferredLanguage}.` : ''
    return `${prefix}${fullMessage}:\n'''\n${selection}\n'''`
  }

export const config = {
  explain: {
    icon: <ChatText />,
    label: 'Explain',
    genPrompt: createGenPrompt({
      message: 'Explain the following',
      includeLanguagePrefix: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  translate: {
    icon: <Translate />,
    label: 'Translate',
    genPrompt: createGenPrompt({
      isTranslation: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  translateToEn: {
    icon: <Globe />,
    label: 'Translate (To English)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'English',
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  translateToZh: {
    icon: <Globe />,
    label: 'Translate (To Chinese)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'Chinese',
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  translateBidi: {
    icon: <Globe />,
    label: 'Translate (Bidirectional)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      enableBidirectional: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  summary: {
    icon: <CardHeading />,
    label: 'Summary',
    genPrompt: createGenPrompt({
      message: 'Summarize the following as concisely as possible',
      includeLanguagePrefix: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  polish: {
    icon: <Palette />,
    label: 'Polish',
    genPrompt: createGenPrompt({
      message:
        'Check the following content for possible diction and grammar problems, and polish it carefully',
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  sentiment: {
    icon: <EmojiSmile />,
    label: 'Sentiment Analysis',
    genPrompt: createGenPrompt({
      message:
        'Analyze the sentiments expressed in the following content and make a brief summary of the sentiments',
      includeLanguagePrefix: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  divide: {
    icon: <CardList />,
    label: 'Divide Paragraphs',
    genPrompt: createGenPrompt({
      message: 'Divide the following into paragraphs that are easy to read and understand',
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  code: {
    icon: <Braces />,
    label: 'Code Explain',
    genPrompt: createGenPrompt({
      message: 'Explain the following code',
      includeLanguagePrefix: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },
  ask: {
    icon: <QuestionCircle />,
    label: 'Ask',
    genPrompt: createGenPrompt({
      message: 'Analyze the following content and express your opinion, or give your answer',
      includeLanguagePrefix: true,
    }),
    interaction: SelectionInteraction.CONVERSATION,
  },

  // Editing Tools
  fixGrammar: {
    icon: <Spellcheck />,
    label: 'Fix Grammar',
    genPrompt: createGenPrompt({
      message: 'Fix the grammar of the following content',
    }),
    interaction: SelectionInteraction.CHANGE_SELECTION,
  },
}
