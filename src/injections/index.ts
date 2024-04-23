import Modules from "../lib/requiredModules";
import injectMessageContent from "./MessageContent";
import injectPopover from "./Popover";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectMessageContent();
  injectPopover();
};

export default { applyInjections };
