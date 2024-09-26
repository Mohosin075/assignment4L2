# Course Management Web Application

## Overview

A web application for managing online courses, categories, and reviews using TypeScript, Express.js, and Mongoose for MongoDB.

## Technology Stack

- **Programming Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Joi/Zod

## Models

### Course Model
- **_id**: Object ID
- **title**: String (unique)
- **instructor**: String
- **categoryId**: Object ID
- **price**: Number
- **tags**: Array of Objects (`name`, `isDeleted`)
- **startDate**: String
- **endDate**: String
- **language**: String
- **provider**: String
- **durationInWeeks**: Integer
- **details**: Object (`level`, `description`)

### Category Model
- **_id**: Object ID
- **name**: String (unique)

### Review Model
- **_id**: Object ID
- **courseId**: Object ID
- **rating**: Number (1-5)
- **review**: String

## Error Handling

Global error handling middleware to provide structured error responses.


## API Endpoints

- **Create a Course**: `POST /api/course`
- **Get Paginated and Filtered Courses**: `GET /api/courses`
- **Create a Category**: `POST /api/categories`
- **Get All Categories**: `GET /api/categories`
- **Create a Review**: `POST /api/reviews`
- **Update a Course**: `PUT /api/courses/:courseId`
- **Get Course by ID with Reviews**: `GET /api/courses/:courseId/reviews`
- **Get Best Course Based on Average Review**: `GET /api/course/best`

## Validation

Use Joi/Zod for validating incoming data for courses, categories, and reviews.


## Acknowledgments

- Express.js
- Mongoose
- TypeScript
- Joi / Zod




