// TO-DO - Get a sorted sematic structure of blog post content before rendering
import { Content, ContentType } from "@/type-defs";
import * as R from "ramda";

function viewPathContent(
  path: R.Lens<any, any>,
  elementobject: any
): any[] | string | any {
  return R.view(path, elementobject);
}

const Map = R.addIndex(R.map);

const BlogLink = ({ content, linkUrl }) => {
  return <a href={linkUrl}>{content}</a>;
};

const ELEMENT_TYPE_PATH = R.lensPath(["type"]);

const PARAGRAPH_CONTENT_PATH = R.lensPath([
  "paragraph",
  "text",
  0,
  "plain_text",
]);

const BULLET_LIST_ITEM_PATH = R.lensPath([
  "bulleted_list_item",
  "text",
  0,
  "plain_text",
]);

const QUOTE_CONTENT_PATH = R.lensPath(["quote", "text", 0, "plain_text"]);
const CODE_ITEM_PATH = R.lensPath(["code", "text", 0, "plain_text"]);
const PARAGRAPH_PATH = R.lensPath(["paragraph", "text"]);

const HEADING_CONTENT_PATH = (level: number) =>
  R.lensPath([`heading_${level}`, "text", 0, "plain_text"]);

const getContent = (path) => (elementObject) =>
  viewPathContent(path, elementObject);

const elementHasChildren = (path) => (elementObject) =>
  R.length(viewPathContent(path, elementObject)) > 1;

const getParagraphContent = getContent(PARAGRAPH_CONTENT_PATH);
const getParagraphArray = getContent(PARAGRAPH_PATH);
const getElementType = getContent(ELEMENT_TYPE_PATH);
const paragraphHasChildren = elementHasChildren(PARAGRAPH_PATH);

const parseParagraph = (elementObject, index: number) => {
  if (!paragraphHasChildren(elementObject)) {
    return <p key={index}>{getParagraphContent(elementObject)}</p>;
  } else {
    const paragraphArray = getParagraphArray(elementObject);
    const paragraphChildren = Map(parsePregnantParagraph, paragraphArray);
    const PregnantParagraph = (
      <p key={index}>{Map((x) => x, paragraphChildren)}</p>
    );
    return PregnantParagraph;
  }
};

const parsePregnantParagraph = (contentObject, index: number) => {
  if (contentObject.href !== null) {
    return (
      <BlogLink
        key={index}
        linkUrl={contentObject.href}
        content={contentObject.plain_text}
      />
    );
  }

  return contentObject.plain_text;
};

const renderProcedure = (elementObject: Content, index: number) => {
  const elementType: ContentType = getElementType(elementObject);

  switch (elementType) {
    case "paragraph":
      return parseParagraph(elementObject, index);
    case "heading_1":
      return (
        <h1 key={index}>
          {getContent(HEADING_CONTENT_PATH(1))(elementObject)}
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={index}>
          {getContent(HEADING_CONTENT_PATH(2))(elementObject)}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={index}>
          {getContent(HEADING_CONTENT_PATH(3))(elementObject)}
        </h3>
      );
    case "heading_4":
      return (
        <h4 key={index}>
          {getContent(HEADING_CONTENT_PATH(4))(elementObject)}
        </h4>
      );
    case "heading_5":
      return (
        <h5 key={index}>
          {getContent(HEADING_CONTENT_PATH(5))(elementObject)}
        </h5>
      );
    case "heading_6":
      return (
        <h6 key={index}>
          {getContent(HEADING_CONTENT_PATH(6))(elementObject)}
        </h6>
      );
    case "bulleted_list_item":
      return (
        <li key={index}>{getContent(BULLET_LIST_ITEM_PATH)(elementObject)}</li>
      );
    case "code":
      return (
        <code key={index}>{getContent(CODE_ITEM_PATH)(elementObject)}</code>
      );
    case "quote":
      return (
        <blockquote key={index}>
          <p>{getContent(QUOTE_CONTENT_PATH)(elementObject)}</p>
        </blockquote>
      );
    default:
      return "";
  }
};

export const ContentRenderer = ({ postContent }) => (
  <> {Map(renderProcedure, postContent)}</>
);
