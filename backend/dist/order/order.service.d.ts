import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<Order[]>;
    findOne(name: string, date: string): Promise<Order[]>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
