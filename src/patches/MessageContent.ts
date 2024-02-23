import { parser as Parser, i18n } from "replugged/common";
import { PluginInjector, PluginLogger, ShownMessageStateIds } from "../index";
import { MessageContent } from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.before(MessageContent.default, "type", (args) => {
    const [props] = args;
    try {
      if (ShownMessageStateIds.has(props?.message?.id)) return args;
      if (!Array.isArray(props.content)) props.content = [props.content];

      props.content = Utils.linkFilter(props.message, props.content);
      if (!props.content.length && props.className?.includes("repliedTextContent"))
        props.content = Parser.parse(i18n.Messages.REPLY_QUOTE_NO_TEXT_CONTENT);
    } catch (err) {
      PluginLogger.error(`私の闘争: ${err}`);
    }

    return args;
  });
};
