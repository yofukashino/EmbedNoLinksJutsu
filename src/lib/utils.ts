import { util } from "replugged";
import Types from "../types";

export const linkFilter = (
  message: Types.Message,
  children: React.ReactElement | React.ReactElement[],
): boolean =>
  Array.isArray(children)
    ? Boolean(children?.filter?.(linkFilter.bind(null, message)).length)
    : !message?.embeds?.some((embed) => embed?.url == children?.props?.href);

export default { ...util, linkFilter };
