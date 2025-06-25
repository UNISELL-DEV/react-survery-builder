import React from 'react';
import { BlockData } from '../../types';
import { themes } from '../../themes';

interface HtmlRendererProps {
  block: BlockData;
  theme?: string;
}

export const HtmlRenderer: React.FC<HtmlRendererProps> = ({
  block,
  theme = 'default'
}) => {
  const themeConfig = themes[theme as keyof typeof themes] || themes.default;

  return (
    <div
      className="survey-html"
      dangerouslySetInnerHTML={{ __html: block.html || '' }}
    />
  );
};
