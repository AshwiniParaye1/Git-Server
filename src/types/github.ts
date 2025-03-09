export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubIssue {
  html_url: string;
  number: number;
  title: string;
  state: string;
  body: string;
}

export interface CreateIssueRequest {
  title: string;
  body: string;
}
