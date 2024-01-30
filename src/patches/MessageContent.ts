import { React } from "replugged/common";
import { PluginInjector, PluginLogger, ShownMessageStateIds } from "../index";
import { MessageContent } from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.before(MessageContent.default, "type", (args) => {
    React.useEffect(() => {
      console.log(JSON.stringify(ShownMessageStateIds.values()));
    }, [JSON.stringify(ShownMessageStateIds.values())]);
    const [props] = args;
    if (ShownMessageStateIds.has(props?.message?.id)) return args;
    if (!Array.isArray(props.content)) props.content = [props.content];
    try {
      props.content = props.content.filter(Utils.linkFilter.bind(null, props.message));
    } catch (error) {
      PluginLogger.error(error);
    }

    return args;
  });
};
