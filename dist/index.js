"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const github_service_1 = require("./services/github.service");
const dotenv_1 = __importDefault(require("dotenv"));
const githubUsername = process.env.GITHUB_USERNAME || "AshwiniParaye1";
const githubService = new github_service_1.GitHubService(githubUsername);
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Swagger UI setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message for the API
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Express + TypeScript Server
 */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Express + TypeScript Server" });
});
/**
 * @swagger
 * /github:
 *   get:
 *     summary: Get GitHub user profile and repositories
 *     description: Returns user profile information and list of repositories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/GitHubUser'
 *                 repositories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GitHubRepo'
 *       500:
 *         description: Server Error
 */
app.get("/github", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [profile, repositories] = yield Promise.all([
            githubService.getUserProfile(),
            githubService.getRepositories()
        ]);
        console.log("profile: ", profile);
        res.json({ profile, repositories });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /github/{repoName}:
 *   get:
 *     summary: Get repository details
 *     description: Returns detailed information about a specific repository
 *     parameters:
 *       - in: path
 *         name: repoName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GitHubRepo'
 *       404:
 *         description: Repository not found
 *       500:
 *         description: Server Error
 */
app.get("/github/:repoName", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = yield githubService.getRepository(req.params.repoName);
        res.json(repo);
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /github/{repoName}/issues:
 *   post:
 *     summary: Create a new issue
 *     description: Creates a new issue in the specified repository
 *     parameters:
 *       - in: path
 *         name: repoName
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Issue created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GitHubIssue'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Repository not found
 *       500:
 *         description: Server Error
 */
app.post("/github/:repoName/issues", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issueData = req.body;
        const issue = yield githubService.createIssue(req.params.repoName, issueData);
        res.status(201).json(issue);
    }
    catch (error) {
        next(error);
    }
}));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
