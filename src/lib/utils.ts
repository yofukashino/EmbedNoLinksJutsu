import { util } from "replugged";
import Types from "../types";

export const linkFilter = (
  message: Types.Message,
  array: React.ReactElement[],
): React.ReactElement[] =>
  array.reduce((acc, children) => {
    if (Array.isArray(children)) {
      const filteredSubarray = linkFilter(message, children);
      acc.push(...filteredSubarray);
    } else if (!message?.embeds?.some((embed) => embed?.url == children?.props?.href)) {
      acc.push(children);
    }
    return acc;
  }, []);

export default { ...util, linkFilter };
