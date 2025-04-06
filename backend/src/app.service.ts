import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return [
      { id: 1,orderer: "EARN" , name: "Laptop", qty: 2 , price: 25000 , date : "2025-05-04"},
      { id: 2,orderer: "EARN" , name: "Smartphone", qty: 2 , price: 15000 , date : "2025-05-04"},
      { id: 3,orderer: "EARN" , name: "Headphones", qty: 2 , price: 2500 , date : "2025-05-04"},
      { id: 4,orderer: "EARN" , name: "Smartwatch", qty: 2 , price: 5000 , date : "2025-05-04"},
      { id: 5,orderer: "EARN" , name: "Keyboard", qty: 2 , price: 1200 , date : "2025-05-04"},
      { id: 6,orderer: "EARN" , name: "Mouse", qty: 2 , price: 800 , date : "2025-05-04"},
      { id: 7,orderer: "EARN" , name: "Monitor", qty: 2 , price: 7000 , date : "2025-05-04"},
      { id: 8,orderer: "EARN" , name: "Printer", qty: 2 , price: 4500 , date : "2025-05-04"},
      { id: 9,orderer: "EARN" , name: "Tablet", qty: 2 , price: 12000 , date : "2025-05-04"},
      { id: 10,orderer: "EARN" , name: "External Hard Drive", qty: 2 , price: 3500, date : "2025-05-04" }
    ];  
  }
}
