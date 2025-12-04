// // Custom UsersController for user management endpoints in NestJS.
// // - Handles CRUD operations for users (get, create, update, delete).
// // - Integrates with UsersService for business logic.
// // - JwtAuthGuard usage is available for route protection.
// import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// // import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('users')
// export class UsersController {
// 	constructor(private usersService: UsersService) {}

// 	// Get all users (protected)
// 	// @UseGuards(JwtAuthGuard)
// 	@Get()
// 	async getAll() {
// 		return this.usersService.getAll();
// 	}

// 	// Get single user by ID (protected)
// 	// @UseGuards(JwtAuthGuard)
// 	@Get(':id')
// 	async getOne(@Param('id') id: string) {
// 		return this.usersService.findById(+id);
// 	}

// 	// Create user (open - for demo)
// 	@Post()
// 	async create(@Body() body: { username: string; password: string }) {
// 		return this.usersService.createUser(body.username, body.password);
// 	}

// 	// Update user (protected)
// 	// @UseGuards(JwtAuthGuard)
// 	@Put(':id')
// 	async update(@Param('id') id: string, @Body() body: any) {
// 		return this.usersService.updateUser(+id, body);
// 	}

// 	// Delete user (protected)
// 	// @UseGuards(JwtAuthGuard)
// 	@Delete(':id')
// 	async remove(@Param('id') id: string) {
// 		return this.usersService.deleteUser(+id);
// 	}
// }


// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Body,
//   Param,
//   UseGuards,
//   Request,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('users')
// export class UsersController {
//   constructor(private usersService: UsersService) {}

//   // Get all users (admin/demo)
//   @Get()
//   async getAll() {
//     return this.usersService.getAll();
//   }

//   // Get single user by ID
//   @Get(':id')
//   async getOne(@Param('id') id: string) {
//     return this.usersService.findById(+id);
//   }

//   // Create user (open for demo)
//   @Post()
//   async create(@Body() body: { username: string; password: string }) {
//     return this.usersService.createUser(body.username, body.password);
//   }

//   // Update user by ID (admin use)
//   @Put(':id')
//   async update(@Param('id') id: string, @Body() body: any) {
//     return this.usersService.updateUser(+id, body);
//   }

//   // Delete user by ID (admin use)
//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.usersService.deleteUser(+id);
//   }

//   // ✅ NEW: Update currently logged-in user (self-service)
//   @UseGuards(JwtAuthGuard)
//   @Put('me')
//   async updateMe(
//     @Request() req: any, // quick fix for TS7006
//     @Body() body: { username?: string; password?: string },
//   ) {
//     const userId = req.user.userId; // comes from JWT payload
//     return this.usersService.updateUser(userId, body);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  // ✅ Self-update route with JSON response
  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMe(
    @Request() req: any,
    @Body() body: { username?: string; password?: string },
  ) {
    const userId = req.user.userId;
    const updated = await this.usersService.updateUser(userId, body);
    return { success: true, user: updated }; // ✅ Return JSON to avoid frontend error
  }
}