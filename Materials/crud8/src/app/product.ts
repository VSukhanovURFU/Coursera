export class Product {
  // Объявления полей объекта из таблицы базы данных,
  // приходящего из REST-сервиса в формате JSON
  // Например:
  // {id: 1, prodName: "Хлеб", prodDesc: "Насущный", prodPrice: 30.5,
  // updatedAt: Wed Oct 09 2019 00:00:00 GMT+0500 (Екатеринбург, стандартное время)}
  id: string;
  // tslint:disable-next-line:variable-name
  prod_name: string;
  // tslint:disable-next-line:variable-name
  prod_desc: string;
  // tslint:disable-next-line:variable-name
  prod_price: number;
  // tslint:disable-next-line:variable-name
  updated_at: Date;
}
