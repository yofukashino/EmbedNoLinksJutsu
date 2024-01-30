import patchMessageContent from "./MessageContent";
import patchPopover from "./Popover";
export const applyInjections = (): void => {
  patchMessageContent();
  patchPopover();
};

export default { applyInjections };
