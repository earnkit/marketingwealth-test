import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity'

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto) 
    const toCreate = await this.orderRepository.insert(createOrderDto) 
    return { message: "ok" }; 
  }

  
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }


  async findOne(name: string, date: string) {
    return await this.orderRepository.createQueryBuilder('test')
      .where('test.name = :name', { name })
      .orWhere('test.date = :date', { date })
      .getMany();
  }


  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({id: id })
    const updatedOrder = {
      ...order,
      ...updateOrderDto,
    };
    const toUpdate = await this.orderRepository.save(updatedOrder) 
    return { message: "ok" }; 
  }

  async remove(id: number) {
    const toDelete = await this.orderRepository.delete(id)
    return { message: "ok" }; 
  }
}
