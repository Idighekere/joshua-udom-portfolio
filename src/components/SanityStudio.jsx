import { Studio } from "sanity";
import config from "../../studio/sanity.config.js";
import { memo } from "react";

const SanityStudio = () => {
  return <Studio config={config} id="sanity-studio" />;
};

export default memo(SanityStudio);
