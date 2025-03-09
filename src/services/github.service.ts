import axios from "axios";
import {
  GitHubUser,
  GitHubRepo,
  GitHubIssue,
  CreateIssueRequest
} from "../types/github";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN environment variable is required");
}

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json"
  }
});

export class GitHubService {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  async getUserProfile(): Promise<GitHubUser> {
    try {
      const response = await githubApi.get<GitHubUser>(
        `/users/${this.username}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch user profile: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  async getRepositories(): Promise<GitHubRepo[]> {
    try {
      const response = await githubApi.get<GitHubRepo[]>(
        `/users/${this.username}/repos`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch repositories: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  async getRepository(repoName: string): Promise<GitHubRepo> {
    try {
      const response = await githubApi.get<GitHubRepo>(
        `/repos/${this.username}/${repoName}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch repository: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  async createIssue(
    repoName: string,
    issueData: CreateIssueRequest
  ): Promise<GitHubIssue> {
    try {
      const response = await githubApi.post<GitHubIssue>(
        `/repos/${this.username}/${repoName}/issues`,
        issueData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create issue: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }
}
