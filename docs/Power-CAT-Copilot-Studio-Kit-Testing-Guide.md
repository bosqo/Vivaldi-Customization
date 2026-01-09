# Power CAT Copilot Studio Kit: Agent Testing Guide

A comprehensive guide to configuring agents, creating tests, and understanding the testing framework in the Microsoft Power CAT Copilot Studio Kit.

---

## Table of Contents

1. [Overview](#overview)
2. [Glossary of Terms](#glossary-of-terms)
3. [Prerequisites](#prerequisites)
4. [Agent Configuration](#agent-configuration)
5. [Test Configuration](#test-configuration)
6. [Running Tests](#running-tests)
7. [Analyzing Test Results](#analyzing-test-results)
8. [Automated Testing in Pipelines](#automated-testing-in-pipelines)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The **Power CAT Copilot Studio Kit** is a comprehensive toolkit developed by Microsoft that augments Microsoft Copilot Studio capabilities. It enables makers to develop, govern, and test custom agents using automated validation, LLM-based content analysis, prompt optimization, and aggregated KPI tracking.

### Key Testing Capabilities

| Capability | Description |
|------------|-------------|
| **Batch Testing** | Execute multiple tests against agents in automated runs |
| **Multi-Turn Testing** | Validate end-to-end conversation flows with sequential test execution |
| **Response Validation** | Compare agent responses against expected values |
| **Topic Matching** | Verify correct topic triggering |
| **Generative Answer Analysis** | Use AI to evaluate non-deterministic AI responses |
| **Plan Validation** | Validate dynamic plans include expected tools |
| **Pipeline Integration** | Automated testing during deployment workflows |

---

## Glossary of Terms

### Core Concepts

| Term | Definition |
|------|------------|
| **Agent** | A custom Copilot Studio bot/assistant that responds to user utterances and performs actions |
| **Agent Configuration** | A record in the Kit that defines how to connect to and interact with a specific agent for testing, KPIs, or file synchronization |
| **Test Set** | A collection of related test cases organized for batch execution |
| **Test Run** | An execution instance where all tests in a Test Set are run against an Agent Configuration |
| **Test Result** | The outcome record for an individual test case after execution |
| **Test Utterance** | The message or prompt sent to the agent during a test |
| **Expected Response** | The anticipated agent reply used for validation |

### Test Types

| Term | Definition |
|------|------------|
| **Response Match** | A test type that validates agent responses using comparison operators (equals, contains, begins with, ends with) |
| **Attachments Match** | A test type that compares JSON responses from agent attachments with expected values |
| **Topic Match** | A test type that validates the correct topic was triggered (requires Dataverse enrichment) |
| **Generative Answers** | A test type using LLM to assess if AI-generated answers match expectations (requires AI Builder) |
| **Multi-Turn Test** | A test type that chains multiple test cases within a single conversation context |
| **Plan Validation** | A test type that validates dynamic plans include expected tools for agents with generative orchestration |

### Configuration Concepts

| Term | Definition |
|------|------------|
| **Direct Line** | A Microsoft Bot Framework channel used to communicate with agents programmatically |
| **Token Endpoint** | The URL endpoint used to obtain authentication tokens for agent communication |
| **Channel Security** | Security setting for web and Direct Line channels that requires secret-based authentication |
| **Dataverse** | Microsoft's data platform used for storing configurations, test data, and results |
| **Environment Variable** | A Power Platform configuration setting that stores values like connection strings or secrets |
| **Connection Reference** | A reusable connection configuration to external services |

### Enrichment Types

| Term | Definition |
|------|------------|
| **Dataverse Enrichment** | Process of adding conversation transcript data to test results for topic matching and detailed analysis |
| **Application Insights Enrichment** | Process of adding Azure telemetry data to test results for deeper AI response analysis |
| **Generative Answers Analysis** | AI Builder-powered evaluation of agent responses against expected outcomes |
| **Conversation Transcript** | A detailed record of agent-user interactions stored in Dataverse |

### Authentication Terms

| Term | Definition |
|------|------------|
| **Entra ID v2** | Microsoft's identity platform (formerly Azure AD) used for user authentication |
| **KitAuthApp** | An app registration in Azure used by the Copilot Studio Kit for testing |
| **CopilotStudioAuthApp** | An app registration used by the Copilot Studio agent itself |
| **Client ID** | The unique identifier for an Azure app registration |
| **Tenant ID** | The unique identifier for an Azure Active Directory tenant |
| **Scope** | A permission boundary defined for API access (e.g., `api://xxx/copilot.studio.scope`) |
| **Client Secret** | A secure password used for application authentication |

### Metrics and Analytics

| Term | Definition |
|------|------------|
| **Success Rate** | Percentage of test results with a Success outcome compared to total tests |
| **Latency** | Response time measurement in milliseconds |
| **Conversation KPIs** | Aggregated performance metrics including session counts, conversation turns, and outcomes |
| **Intent Score** | A confidence value indicating how well the user's input matched a recognized intent |
| **Pass Threshold** | Minimum percentage of expected tools that must be present for Plan Validation tests |

### Status Values

| Term | Definition |
|------|------------|
| **Not Run** | Initial state before test execution begins |
| **Running** | Test execution is in progress |
| **Pending** | Test is waiting for enrichment or additional processing |
| **Complete** | All processing has finished |
| **Success** | Test passed validation |
| **Failed** | Test did not meet expected criteria |
| **Error** | An exception occurred during test execution |
| **Unknown** | Result could not be determined |

---

## Prerequisites

Before using the testing features, ensure you have:

### Required Components

| Requirement | Description |
|-------------|-------------|
| **Power Platform Environment** | Environment with Dataverse as data store |
| **System Administrator Role** | Required for installation and configuration |
| **Power Apps License** | License enabling model-driven application usage |
| **Power Automate License** | License for cloud flows with premium connectors |
| **Creator Kit** | Must be installed before the Copilot Studio Kit |
| **PCF Enablement** | Power Apps Component Framework must be enabled |

### Optional Enhancements

| Component | Purpose | Cost |
|-----------|---------|------|
| **AI Builder Credits** | Required for Generative Answers analysis | ~50 credits per test case |
| **Azure Application Insights** | Extended telemetry for AI response analysis | Azure subscription costs |

---

## Agent Configuration

Agent configuration defines how the Kit connects to and interacts with your Copilot Studio agent. Each configuration can support multiple purposes: Test Automation, Conversation KPIs, and File Synchronization.

### Creating an Agent Configuration

1. Open the Power CAT Copilot Studio Kit application
2. Navigate to **Agent Configurations**
3. Click **+ New**
4. Enter a **Name** (internal identifier)
5. Select **Configuration Type(s)**
6. Configure settings based on selected types
7. **Save** the record

### Configuration Types

#### Test Automation Configuration

Enable this to run automated tests against your agent.

##### Core Settings

| Field | Required | Description |
|-------|----------|-------------|
| **Region** | Yes | Deployment region for targeting the correct Direct Line endpoint |
| **Token Endpoint** | Conditional | URL from the Email app channel; required when Channel Security is disabled |
| **Channel Security** | Conditional | Enable if web/Direct Line security is active; required when user authentication is enabled |

##### Secret Storage Options

| Field | Description |
|-------|-------------|
| **Secret Location** | Choose between `Dataverse` (secured column) or `Key Vault` (environment variable reference) |
| **Secret** | Direct Line channel secret (when using Dataverse storage) |
| **Environment Variable** | Schema name linking to Azure Key Vault secret (when using Key Vault) |

##### User Authentication (Entra ID v2)

Configure these fields when your agent requires end-user authentication:

| Field | Required | Description |
|-------|----------|-------------|
| **User Authentication** | Yes | Select "Entra ID v2" to enable authentication |
| **Client ID** | Yes | Application ID of KitAuthApp |
| **Tenant ID** | Yes | Directory (tenant) ID of the app registration |
| **Scope** | Yes | Custom scope in format `api://[client-id]/scope.name` |
| **Secret Location** | Yes | Dataverse or Key Vault storage option |
| **Client Secret** | Yes | KitAuthApp client secret |

##### Application Insights Enrichment

Enable to add Azure telemetry data to test results:

| Field | Required | Description |
|-------|----------|-------------|
| **Enrich With Azure Application Insights** | - | Toggle to enable enrichment |
| **App Insights Client ID** | Yes | Application ID with read permissions |
| **App Insights Application ID** | Yes | AppId from Application Insights resource JSON view |
| **App Insights Tenant ID** | Yes | Tenant ID for the Application Insights resource |
| **App Insights Secret Location** | Yes | Dataverse or Key Vault |
| **App Insights Secret/Environment Variable** | Yes | Secret or environment variable reference |

##### Conversation Transcript Enrichment

Enable to incorporate stored conversation transcripts:

| Field | Required | Description |
|-------|----------|-------------|
| **Enrich With Conversation Transcripts** | - | Toggle to enable enrichment |
| **Dataverse URL** | Yes | Environment URL (e.g., `https://org123.crm.dynamics.com`) |
| **Copy Full Transcript** | - | Attaches full transcript JSON to test result records |

##### Generative Answer Analysis

Enable LLM-based response validation:

| Field | Required | Description |
|-------|----------|-------------|
| **Analyze Generated Answers** | - | Toggle to enable AI analysis |
| **Generative AI Provider** | Yes | Currently only "AI Builder" is supported |

#### Conversation KPIs Configuration

Enable this to track agent performance metrics.

| Field | Required | Description |
|-------|----------|-------------|
| **Dataverse URL** | Yes | Environment URL containing transcripts and agent |
| **Agent ID** | Yes | Bot ID from Copilot Studio Settings → Session Details → Copilot Id |
| **Copy Full Transcript** | - | Enables transcript visualization in KPI records |
| **Tracked Variables** | - | Up to 5 custom variables in JSON array format (e.g., `["Activity.Channel", "Activity.Type"]`) |
| **Agent Components** | Read-only | Auto-populated with agent topics and knowledge sources |

#### File Synchronization Configuration

Enable this for SharePoint content synchronization.

##### Primary Settings

| Field | Required | Description |
|-------|----------|-------------|
| **Agent ID** | Yes | Bot ID from Copilot Studio Settings |
| **Dataverse URL** | Yes | Environment URL where content syncs |

##### File Indexer Configuration

At least one indexer is required:

| Field | Required | Description |
|-------|----------|-------------|
| **Name** | Yes | Identifier for the indexer (e.g., "HR Documents") |
| **Site Address** | Yes | SharePoint site URL |
| **Library Name** | Yes | Source document library name |
| **Agent Configuration** | Auto | Auto-populated when created through agent configuration |
| **Include Nested Items** | - | Include child items in subfolders |
| **Limit Entries to Folder** | - | Restrict to specific folder path |
| **SharePoint Files Filter Query** | - | OData filter for file selection |
| **Include SharePoint Pages** | - | Include SharePoint pages |
| **SharePoint Pages Filter Query** | - | OData filter for page selection |

---

## Test Configuration

### Creating a Test Set

Test Sets organize multiple tests for batch execution.

1. Open the Power CAT Copilot Studio Kit application
2. Navigate to **Test Sets**
3. Click **+ New**
4. Enter a **Name** for the test set
5. **Save** the record
6. Add individual test cases to the test set

### Test Types Reference

#### 1. Response Match

The simplest test type with immediate evaluation.

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Response Match" |
| **Test Utterance** | Yes | Message sent to the agent |
| **Expected Response** | Yes | Expected agent reply |
| **Comparison Operator** | - | `equals`, `contains`, `begins with`, or `ends with` (default: contains) |

**Use Case:** Validating deterministic responses like greetings, FAQ answers, or static content.

#### 2. Attachments Match

Validates agent attachment responses (cards, files, etc.).

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Attachments" |
| **Test Utterance** | Yes | Message sent to the agent |
| **Expected Attachments JSON** | Yes | JSON array defining expected attachment structure |
| **Comparison Mode** | - | `exact match`, `not equal`, `contains`, or `AI Validation` |

**Use Case:** Testing Adaptive Cards, file attachments, or rich media responses.

#### 3. Topic Match

Validates that expected topics trigger correctly. Requires Dataverse enrichment.

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Topic Match" |
| **Test Utterance** | Yes | Message sent to the agent |
| **Expected Topic Name** | Yes | Topic name that should trigger |

**Note:** With generative orchestration enabled, supports comma-separated multi-topic matching (e.g., `"Topic1,Topic2"`).

**Use Case:** Ensuring correct intent recognition and topic routing.

#### 4. Generative Answers

Uses AI to evaluate non-deterministic responses. Requires AI Builder.

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Generative Answers" |
| **Test Utterance** | Yes | Message sent to the agent |
| **Expected Response** | Yes | Sample answer or validation criteria |

**Note:** When Azure Application Insights is enabled, can test negative scenarios like moderation failures.

**Use Case:** Validating AI-generated responses, knowledge base answers, and generative AI content.

#### 5. Multi-Turn

Chains multiple test cases within one conversation context.

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Multi-turn" |
| **Child Tests** | Yes | Ordered list of child test cases |
| **Critical Flag** (per child) | - | If true, failure halts the sequence |

**Execution Flow:**
1. Child tests execute sequentially in the same conversation
2. Non-critical tests feed context without blocking execution
3. Critical test failures halt the multi-turn sequence
4. Parent test succeeds only if all critical child tests pass

**Use Case:** Testing end-to-end conversation flows, multi-step processes, and context-dependent interactions.

#### 6. Plan Validation

Validates dynamic plans for agents with generative orchestration.

| Field | Required | Description |
|-------|----------|-------------|
| **Test Type** | Yes | Set to "Plan Validation" |
| **Test Utterance** | Yes | Message sent to the agent |
| **Expected Tools** | Yes | Comma-separated list of expected tools |
| **Pass Threshold %** | Yes | Minimum percentage of tools that must be present |

**Use Case:** Ensuring orchestrated agents include correct tools in their execution plans.

### Common Test Configuration Fields

| Field | Description |
|-------|-------------|
| **Name** | Internal test identifier (e.g., `TST-001`) |
| **External Variables JSON** | Pass contextual values like language preferences |
| **Seconds Before Getting Answer** | Delay before response evaluation (useful for slow operations) |

### Bulk Operations

The Kit supports Excel-based bulk operations:

1. **Export Tests:** Export existing tests to Excel for bulk editing
2. **Import Tests:** Import test cases from Excel spreadsheets
3. **Duplicate Test Set:** Clone an entire test set with all test cases
4. **Duplicate Test Case:** Copy individual tests with modified parameters

---

## Running Tests

### Creating a Test Run

1. Open the Power CAT Copilot Studio Kit application
2. Navigate to **Test Runs**
3. Click **+ New**
4. Configure the test run:

| Field | Required | Description |
|-------|----------|-------------|
| **Name** | Yes | Identifier for this test run |
| **Agent Test Set** | Yes | Select the test set to execute |
| **Agent Configuration** | Yes | Select the agent configuration to test against |

5. **Save** to trigger execution

### Execution Process

1. A cloud flow launches automatically upon save
2. **Run Status** transitions: `Not Run` → `Running` → `Complete`
3. Individual **Test Results** generate for each test case
4. Additional enrichment workflows execute if configured:
   - App Insights Enrichment: `Pending` → `Running` → `Complete`
   - Generated Answers Analysis: `Pending` → `Running` → `Complete`
   - Dataverse Enrichment: `Pending` → `Running` → `Complete`

### Alternative Execution Methods

| Method | Description |
|--------|-------------|
| **Duplicate Run** | Click "Duplicate Run" command to re-execute the same test set immediately |
| **Step Rerunning** | Independently rerun specific enrichment workflows on results with Success or Pending status |

### Execution Timing

| Setting | Default | Description |
|---------|---------|-------------|
| **App Insights Enrichment Delay** | 5 minutes | Wait time before retrieving Application Insights data |
| **Transcript Enrichment Delay** | 60 minutes | Wait time before retrieving conversation transcripts |

---

## Analyzing Test Results

### Test Run Statuses

Each test run tracks four processing stages:

| Status | Description |
|--------|-------------|
| **Run Status** | Core test execution via Direct Line API |
| **App Insights Enrichment Status** | Azure telemetry enrichment (if enabled) |
| **Generated Answers Analysis** | AI Builder evaluation (if enabled) |
| **Dataverse Enrichment Status** | Transcript processing (if enabled) |

### Key Performance Metrics

| Metric | Description |
|--------|-------------|
| **Success Rate (%)** | Percentage of successful tests vs. total tests |
| **Average Latency (ms)** | Mean response time across all tests |
| **Success Count** | Number of passed tests |
| **Failed Count** | Number of failed tests |
| **Pending Count** | Tests awaiting enrichment |
| **Unknown Count** | Tests with undetermined results |
| **Error Count** | Tests that encountered exceptions |

### Result Analysis Views

Results are organized by test type:

- **Generative Answers Results**
- **Response Match Results**
- **Topic Match Results**
- **Attachment Results**

### Individual Result Details

Each test result captures:

| Data Point | Description |
|------------|-------------|
| **Result** | Success, Failed, Pending, Unknown, or Error |
| **Result Reason** | Explanation of the outcome |
| **Actual Response** | The agent's actual reply |
| **Latency (ms)** | Response time |
| **Triggered Topic** | Which topic was activated |
| **Intent Score** | Confidence value for intent recognition |
| **Conversation ID** | Unique identifier for the conversation |
| **Timestamp** | Execution time |
| **Citations** | Referenced knowledge sources |
| **Suggested Actions** | Any actions the agent proposed |
| **Transcript** | Full conversation record (if enriched) |

### Interpreting Results

| Result Reason | Meaning |
|---------------|---------|
| "AI-generated assessment of the response. Please review" | AI evaluation requires human validation |
| Specific comparison failure | Detailed explanation of mismatch |
| Topic mismatch | Expected vs. actual topic difference |
| Tool validation failure | Missing tools in plan |

### Multi-Turn Result Evaluation

- Parent test result depends on critical child test outcomes
- Non-critical failures don't prevent sequence advancement
- Parent succeeds only when all critical children pass
- Review individual child results for detailed analysis

---

## Automated Testing in Pipelines

The Kit supports automated testing during deployment workflows, ensuring only validated agents reach production.

### Pipeline Components

| Environment | Purpose |
|-------------|---------|
| **Pipeline Host Environment** | Central control and orchestration |
| **Development Environment** | Source environment for agents |
| **Target/Production Environment** | Deployment destination |

### Configuration Steps

1. Open the **Deployment Pipeline Configuration App**
2. Establish pipeline parameters
3. Define deployment stages with target environments
4. Enable **pre-export** and **pre-deployment** procedures
5. Configure test validation thresholds

### Automated Workflow

1. Deployment is requested
2. Pipeline pauses execution
3. Automated tests run against the agent
4. Results are evaluated against pass thresholds
5. **Pass:** Deployment proceeds to target environment
6. **Fail:** Deployment is blocked; remediation required

### Benefits

- Quality assurance checkpoint before production
- Reduced manual oversight
- Governance enforcement
- Continuous delivery support

---

## Troubleshooting

### Common Issues

#### DLP Policy Errors

**Symptoms:** `AppForbidden` or Data Loss Prevention errors

**Solution:** Verify that required connectors are allowed in your DLP policy:
- Microsoft Dataverse
- SharePoint
- Office 365 Outlook
- Power Platform for Admins
- Microsoft Entra ID

#### Authentication Errors

**Prerequisites Checklist:**
- [ ] Agent and Kit are in the same tenant
- [ ] Two app registrations exist: KitAuthApp and CopilotStudioAuthApp
- [ ] Test connectivity without authentication first
- [ ] Third-party cookies are allowed in the browser

**KitAuthApp Configuration:**
- [ ] Web Redirect URI references Dataverse deployment location
- [ ] Account type: "Accounts in any organizational directory...and personal Microsoft accounts"
- [ ] API permissions include User.Read (delegated, admin consent granted)
- [ ] Client secret is generated and entered in Agent Configuration

**CopilotStudioAuthApp Configuration:**
- [ ] Redirect URIs include Bot Framework endpoints (EU and standard)
- [ ] Implicit grant and hybrid flows enabled for Access and ID tokens
- [ ] API permissions: openid, profile, User.Read (delegated, admin consent granted)
- [ ] Custom scope created and enabled
- [ ] KitAuthApp client ID added to Authorized client applications

**Copilot Studio Agent Settings:**
- [ ] "Authenticate Manually" is enabled
- [ ] Sign-in is required
- [ ] Service provider: Azure Active Directory v2
- [ ] Client ID/secret match CopilotStudioAuthApp
- [ ] Token Exchange URL matches custom scope
- [ ] Bot is published

**Kit Agent Configuration:**
- [ ] Token endpoint correctly configured from Email app channel
- [ ] User authentication set to "Entra ID v2"
- [ ] Client ID matches KitAuthApp
- [ ] Scope aligns with CopilotStudioAuthApp custom scope
- [ ] Channel Security enabled in Direct Line Settings

#### Test Run Errors

**Symptoms:** Cloud flow failures during test execution

**Diagnosis:**
1. Open the Test Run record
2. Locate the **Error Details** field
3. Click the URL to access the failed flow instance in Power Automate
4. Review the flow run history for specific error details

#### Enrichment Failures

**App Insights Enrichment:**
- Verify Application Insights resource is receiving telemetry
- Check app registration has Data.Read permission
- Confirm Reader role is assigned in Azure
- Validate AppId matches the Application Insights resource

**Dataverse Enrichment:**
- Ensure "Read" access on ConversationTranscript table
- Only same-tenant environments are supported
- Verify Dataverse URL is correct

---

## Quick Reference

### Test Type Selection Guide

| Scenario | Recommended Test Type |
|----------|----------------------|
| Static, deterministic responses | Response Match |
| Adaptive Cards or attachments | Attachments Match |
| Intent recognition validation | Topic Match |
| AI-generated or KB answers | Generative Answers |
| Multi-step conversation flows | Multi-Turn |
| Orchestrated agent tool usage | Plan Validation |

### Configuration Checklist

**Minimum Viable Setup:**
- [ ] Power Platform environment with Dataverse
- [ ] Creator Kit installed
- [ ] PCF enabled
- [ ] Copilot Studio Kit installed
- [ ] Agent Configuration created with Region and Token Endpoint
- [ ] Test Set with at least one test case
- [ ] Test Run created and executed

**Full-Featured Setup (adds):**
- [ ] AI Builder enabled with credits
- [ ] Azure Application Insights configured
- [ ] Dataverse enrichment enabled
- [ ] User authentication configured
- [ ] Pipeline integration configured

---

## Resources

- **Repository:** [microsoft/Power-CAT-Copilot-Studio-Kit](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit)
- **Installation:** Available via AppSource or GitHub
- **License:** MIT
- **Support:** GitHub Issues

---

*Documentation version: 1.0*
*Last updated: January 2026*
*Based on Power CAT Copilot Studio Kit repository*
