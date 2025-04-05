interface svgProps {
  className: string;
  fill?: string;
}

type TagType = {
  id: number;
  tagname: string;
  owner_id: number;
};

type ChatScriptsType = {
  id: number;
  scripts: string;
  owner_id: string;
  associated_tags_id: string;
};
