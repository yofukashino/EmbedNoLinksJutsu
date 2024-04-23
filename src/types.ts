import { types } from "replugged";
import type util from "replugged/util";
import DiscordTypesGeneral from "discord-types/general";
export namespace Types {
  export import DefaultTypes = types;
  export type UtilTree = util.Tree;
  export type ReactTree = util.Tree & React.ReactElement;
  export type Message = DiscordTypesGeneral.Message;
  export interface MessageContent {
    default: {
      $$typeof: symbol;
      compare: DefaultTypes.AnyFunction;
      type: DefaultTypes.AnyFunction;
    } & React.MemoExoticComponent<React.ComponentClass>;
    getContent: DefaultTypes.AnyFunction;
    memoizeMessageProps: DefaultTypes.AnyFunction;
  }
  export interface MessageContentGenertor {
    default: (message: Message) => {
      content: React.ReactElement[];
      hasSpoilerEmbeds: boolean;
    };
    renderAutomodMessageMarkup: DefaultTypes.AnyFunction;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    MessageContent?: MessageContent;
    MessageContentGenertor?: MessageContentGenertor;
  }
  export interface Settings {
    defaultBehaviour: string;
    alt: string;
  }
}
export default Types;
