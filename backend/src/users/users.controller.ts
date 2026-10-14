import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  // GET /api/users  (OWNER sees only their shop by default)
  @Get()
  findAll(@Req() req: any, @Query('shopId') shopId?: string) {
    // Only an ADMIN can request a different shop's users
    const effectiveShopId =
      req.user.role === 'ADMIN' ? shopId : req.user.shopId;
    return this.users.findAll(effectiveShopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto, @Req() req: any) {
    const requesterShopId =
      req.user.role === 'ADMIN' ? undefined : req.user.shopId;
    return this.users.create(dto, requesterShopId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: any,
  ) {
    return this.users.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.users.remove(id, req.user);
  }

  // Change own password
  @Post('change-password')
  @HttpCode(200)
  changePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.users.changePassword(
      req.user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}