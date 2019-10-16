# Code Delivery procedure 101 workshop

## Demo application - requirements

1. There should be the service to manage Products information. This service should provide the following functionality:
    1. List all the Products available to the user.
    2. Create new products.
    3. Edit existing products.

2. The service will consist of the following components:
    1. Products DB. Should be hosted separately. The service should support both Postgres and MongoDB.

    2. Products REST API. Should be hosted separately. Tech: NodeJS, TypeScript, ???. The API should support the following functionalities:
        1. HTTP POST /product - will create a new Product and return it's payload back to the client. Idempotent.
        2. HTTP GET /product/list - will return all the products available to the user.
        3. HTTP GET /product/{id} - will return the specific product by its ID.
        4. HTTP PATCH /product/{id} - will edit the product with the specified ID.
        5. API app should log its internal to stdout using Structured Logging approach.

    3. Products management UI. Should be hosted separately. Tech: AngularJS, TypeScript, ???. Should have the following functionalities:
        1. Products list view.
        2. Create new Product button.
        3. Edit Product button. Should open the Product edit form.

## Agenda

0. Generally:
    1. Talk about tooling a lot. Each tool worth a few words.
    2. Who is responsible for what. Roles: -DevOps- , Devs, PM, BA, QC, QA, etc.
    3. Think about Best practices at each stage of development.
    4. What should be automated or left for manual work?
    5. Why the same code breaks once deployed in Prod compared to lower stacks?
        1. Environment configuration issue. We're out of control on what's there and unable to easily track this.
        2. App's misconfigurations. How to appropriately configure your app.

1. What to start from - need a flowchart to cover the infrastructure/hosting part for each case.
    1. What kind of an app we'll be developing? How are the sandboxes/prod instances set up?
        1. Desktop app - ???
        2. Mobile app - ???
        3. Website - ???
        4. Public facing API - ???
        5. The service with UI, API, and other features.
2. Dev is working on the feature locally.
    1. Step by step guidance from making changes in local env till the app is available for testing in prod.
    2. Demo of the console / AWS interphase/ etc. and what is happening on the each step of a "file" delivery
    3. Source Control: working with branches, PR rewiev, Merge Strategies, Cherry Pick.
3. How to deliver our work:
    1. Copying our app(s), packaged locally, manually to the infrastructure. Pros and Cons. Environment inconsistency issue.
    2. Delivering code vs database - show an example of an app deployed without DB updates, both Postgres and MongoDB. Highlight the differences between Schema-driven and Schema-less DBs. Migrations types?
    3. What actually was deployed? App's Versioning and Source Control Tagging.
    4. Logging in general: types of logs and purpose of it. Log types. Structured VS Plain Text logs. Log levels.
    5. Misconfigurations - troubleshoot it using app logs.
    6. Configuration management. General app configuration VS Secrets (Passwords, Tokens, Access Keys, Hashes, etc.).
    7. All of the above is manual work. People are tend to make mistakes.
4. Fixes for our delivery-phase issues:
    1. Delivery automation 101: build and delivery scripts. Mention about "Build once - deploy everywhere" best practice.
    2. Packaging our deliverables, environment isolation. Docker.
    3. Configuration management best practices. ENV variables and other cool things.
5. Delivery Pipeline - godmode. CI/CD pipeline.
    1. Does it make sense to go this far? Yes! Prooflink ["DORA State Of DevOps 2018"]("../external-content/DORA-State of DevOps.pdf")
    2. Setting up CI/CD from scratch on a project. Where to start?
    3. Pick the CI/CD platform first. Pros and Cons of specific tools (like Jenkins vs TeamCity).
    4. DevOps. This is a set of practices, not a role! ["DevOps Manifesto"](https://sites.google.com/a/jezhumble.net/devops-manifesto/). Basic practices:
        1. Infrastructure As Code. Automated infrastructure provisioning.
        2. /// TBD:
    5. Infrastructure vs Code versions compatibility
6. A couple of little things to keep in mind:
    1. Maintenance windows. Notifications and service availability.
    2. Roots of backward compatibility.
    3. Backups and rollbacks: infrastructure, code and DB.
7. Roles in delivery: Who should do what? /// Questionable.


# Time Spent.

1. 10-12-2019 - 3h.
2. 10-14-2019 - 4h.
3. 10-15-2019 - 3h.
4. 10-16-2019 - 3h.

----------------------------------------------------------------

# Useful links

1. ["Как установить Nginx в Ubuntu 18.04"](https://www.digitalocean.com/community/tutorials/nginx-ubuntu-18-04-ru)
2. ["PostgreSQL in the cloud"](elephantsql.com)
3. ["How To Set Up a Node.js Application for Production on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
