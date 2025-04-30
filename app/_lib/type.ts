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
  script_title: string;
  scripts: string;
  owner_id: string;
  associated_tags_id: string;
};

type UserDetails = {
  id: number;
  auth_user_id: string;
  tokens: number;
  company_details: string;
  company_name: string;
  isCompanySet: boolean;
  subscription: "Free Tier" | "Personal" | "Business";
  email: string;
  response_uses: number;
};

type promptStatus = {
  status: "pending" | "resolve" | "reject";
  response?: string;
};

type adminAccountType = {
  email: string;
  password?: string;
  token: string;
  islogged?: boolean;
};

type messagesType = {
  id: string;
  firstname: string;
  email: string;
  message: string;
};
