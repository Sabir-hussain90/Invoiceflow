import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from './update-shop.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopsController {
  constructor(private shops: ShopsService) {}

  @Get('me')
  findMine(@Req() req: any) {
    return this.shops.findMine(req.user.shopId);
  }

  @Get('me/stats')
  getStats(@Req() req: any) {
    return this.shops.getStats(req.user.shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shops.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateShopDto,
    @Req() req: any,
  ) {
    return this.shops.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.shops.remove(id, req.user);
  }
}