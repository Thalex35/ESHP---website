# École Secour d'en haut

This project is a simple public website for a school. It is designed to present the school to families, parents, and visitors without any account, login, or member area.

## Purpose

The site includes:

- school presentation and values
- sections and study levels
- admission information
- school life and events
- photo gallery
- contact page for families

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Router

## Project direction

This is not a management system with student accounts or staff access. It is intentionally a public-facing website only.

The goal is to keep the app simple, clear, and easy to maintain while providing useful information for prospective families and visitors.

## Main pages

- Home
- About the school
- Sections
- Admissions
- School life
- Gallery
- Contact

## Notes

The content is currently a public-facing starter, and some details such as address, phone number, and contact information may need to be confirmed with the school before publication.

A TEACHER must not automatically have administrative permissions.

An ADMIN must not automatically have SYSTEM_ADMIN permissions.

Use secure backend/database authorization policies where appropriate, not only frontend route protection.

The frontend should hide unauthorized navigation items, but security must also be enforced at the database/backend level.

7. Database foundation

Create a clean PostgreSQL/Supabase database foundation.

At minimum, create structures for:

profiles

Fields should include appropriate fields such as:

id

user_id

first_name

last_name

email

phone

avatar_url

role

created_at

updated_at

students

Include fields such as:

id

user_id

student_number

date_of_birth

status

created_at

updated_at

teachers

Include fields such as:

id

user_id

employee_number

status

created_at

updated_at

classes

Include fields such as:

id

name

academic_year

status

created_at

updated_at

Do NOT create dozens of unnecessary tables yet.

Future tables such as:

applications

documents

assignments

submissions

grades

attendance

payments

notifications

messages

announcements

report_cards

will be introduced in later Agile sprints.

Design the current schema so those future modules can be added cleanly.

8. Public website

Create a professional public-facing school website.

Pages:

Home

Include:

School name

Hero section

Short introduction

School highlights

Call-to-action for admission

Call-to-action for student login

Contact information

Footer

About

Include placeholder content describing the school.

Admissions

For now, explain that online admission is coming / available soon.

Do NOT implement the full admission workflow yet.

Contact

Create a clean contact section/page with placeholder school contact information.

Do not invent real phone numbers, email addresses, physical addresses, or social media accounts.

Use clearly marked placeholder values that can easily be replaced later.

Login

Link to the authentication system.

9. Dashboard architecture

Create a reusable dashboard layout.

The layout should include:

Sidebar

Top navigation

School logo

User avatar

User name

Role

Notifications icon placeholder

Responsive mobile navigation

Logout button

The sidebar must change according to the user's role.

10. Student dashboard

Create a functional student dashboard shell.

Show cards for:

Student ID

Class

Academic average

Assignments

Attendance

Notifications

For now, use appropriate empty states or placeholder values where the underlying feature has not yet been implemented.

Example:

"Grades will appear here once your teachers publish them."

Do not fake real academic data.

Navigation should contain:

Dashboard

My Profile

My Classes

Assignments

Grades

Attendance

Payments

Notifications

Messages

Settings

Future pages can initially display a professional "Coming in a future update" state.

11. Teacher dashboard

Create a functional teacher dashboard shell.

Show:

Number of assigned classes

Number of students

Pending assignments

Recent activity

Navigation:

Dashboard

My Classes

Students

Assignments

Grades

Attendance

Messages

Notifications

Settings

Future modules can initially show empty states.

12. Admin dashboard

Create a functional administrative dashboard.

Show:

Total students

Total teachers

Total classes

Pending applications

Because applications are not implemented yet, use an appropriate empty state instead of fake data.

Navigation:

Dashboard

Students

Teachers

Classes

Admissions

Academic Management

Payments

Announcements

Reports

Notifications

Settings

Future modules should have placeholder pages.

13. System Admin / Developer dashboard

Create a separate technical administration dashboard.

This is NOT the same as the school administrator dashboard.

Show cards for:

Total users

Total students

Total teachers

Active users

System status

Database status

Also create sections/placeholders for:

Audit Logs

System Logs

Error Monitoring

System Health

Technical Settings

User Activity

Use clearly labeled placeholder/empty states for functionality that will be implemented later.

Do not expose this dashboard to normal students, teachers, or administrators.

14. UI/UX design

Create a professional modern educational platform.

The visual style should feel:

Trustworthy

Clean

Modern

Professional

Accessible

Appropriate for a school

Easy for students, teachers, parents, and administrators to understand

Use a consistent design system.

Use:

Cards

Tables

Forms

Dialogs

Dropdown menus

Badges

Tabs

Alerts

Toast notifications

Skeleton loaders

Empty states

Avoid excessive animations.

Prioritize usability over visual effects.

15. School branding

Use the school name:

Ecole Secour d'en haut de puit-sales

Do not invent an official logo.

For now, use a placeholder school logo/image.

I will replace the placeholder logo and images later with the school's real branding.

Create the branding in a way that makes it easy to replace:

Logo

Favicon

Hero image

School images

Colors

Do not hard-code image URLs throughout the application.

Create reusable image/logo components or centralized configuration.

16. Placeholder images

Use professional placeholder images wherever an image is required.

I will replace them later.

Important:

Do not use random broken image URLs.

Do not use images that create copyright problems.

Use reliable placeholder images or local placeholder assets.

Make the image replacement process easy.

Add meaningful alt text.

Do not spend excessive development time finding perfect school photography.

The goal is the functionality and architecture.

17. Responsive design

The system must work properly on:

Desktop

Laptop

Tablet

Mobile

The student and teacher dashboards must be particularly usable on mobile devices.

The sidebar should transform into a mobile navigation menu on smaller screens.

18. Security foundation

Because this application will eventually store sensitive student information and documents, security must be considered from the beginning.

Implement:

Supabase Row Level Security (RLS)

Role-based authorization

Secure authentication

Input validation

Protected routes

Secure database access

Proper error handling

No sensitive information in frontend source code

No exposed API secrets

Environment variables for secrets

Safe handling of user-generated content

Do not expose sensitive database information through public queries.

19. Audit logging architecture

Prepare the architecture for audit logs.

Future sensitive actions should be traceable, for example:

"Admin changed a student's grade."

"Admin approved an admission application."

"Teacher published a grade."

For this first sprint, create the basic structure if practical, but do not build the complete audit management system yet.

20. Error and loading states

Every major page should have:

Loading state

Empty state

Error state

Success feedback

Avoid blank screens.

For example:

If there are no assignments:

"No assignments yet."

If there are no notifications:

"You're all caught up."

21. Demo/test accounts

Create a safe development/demo mechanism for testing the different roles.

Use clearly identifiable development accounts or seed/demo data.

For example:

Student Demo

Teacher Demo

Admin Demo

System Admin Demo

Do not put real personal information into the database.

22. Do NOT implement yet

This is extremely important.

Do NOT implement the following in this sprint:

Full student registration

Birth certificate uploads

Report card uploads

Assignment creation

Assignment submission

Grade management

Exams

Attendance management

Tuition payments

Mobile money integration

Messaging system

Email notification system

Push notifications

Parent portal functionality

Automatic report cards

Complex analytics

AI functionality

Microservices

These will be implemented incrementally in future Agile sprints.

Create the architecture/navigation placeholders where useful, but do not build the actual functionality yet.

23. Code quality

The project will be developed incrementally by a human developer after the initial foundation.

Therefore:

Keep code readable.

Use descriptive names.

Avoid giant components.

Create reusable components.

Avoid unnecessary duplication.

Keep business logic separated from UI.

Use TypeScript properly.

Avoid unnecessary dependencies.

Document important architectural decisions.

Make future modifications easy.

Do not generate unnecessary complexity just to make the project look sophisticated.

24. Agile development requirement

Treat this as Sprint 0 / Sprint 1 of a larger Agile project.

The project must be designed so that every future sprint adds one usable feature without breaking existing functionality.

Examples of future increments:

Sprint 2 → Student admission application

Sprint 3 → Document uploads

Sprint 4 → Admission approval

Sprint 5 → Student management

Sprint 6 → Classes and subjects

Sprint 7 → Teacher management

Sprint 8 → Assignments

Sprint 9 → Grades

Sprint 10 → Attendance

Sprint 11 → Notifications

Sprint 12 → Payments

and so on.

Do not prematurely implement future functionality.

25. Definition of Done for this sprint

Consider this sprint complete only when:

The public website works.

Login works.

Logout works.

Password reset is available.

Authentication state persists correctly.

Protected routes work.

RBAC works.

Student dashboard works.

Teacher dashboard works.

Admin dashboard works.

System Admin dashboard works.

Sidebar/navigation works.

Responsive design works.

PostgreSQL/Supabase database is connected.

Basic user/profile/student/teacher/class structures exist.

RLS/security policies are configured appropriately.

No fake production data is presented as real data.

Placeholder images are used where necessary.

The application has proper loading, empty, and error states.

The project is structured for future Agile sprints.

26. Important instruction

Do not rebuild or redesign the application unnecessarily when future features are requested.

Preserve existing functionality.

When a new feature is requested in a future sprint:

Inspect the current architecture.

Reuse existing components and patterns.

Modify the database through proper migrations.

Preserve existing data.

Add tests where appropriate.

Verify that existing functionality still works.

Implement only the requested sprint functionality.

The goal is to evolve this application progressively into a complete production-quality School Management System.

Start by implementing only this foundation sprint.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/029cc12c-015c-4469-9b59-ca67d2d5f97f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
