import { BaseEntity, Column, Entity, Index } from "typeorm";

@Index("INDEX_EMAIL", ["email"], {})
@Index("INDEX_ORDER_STATUS", ["orderStatus"], {})
@Index("INDEX_PAYMENT_ID", ["paymentId"], {})
@Index("INDEX_PHONE", ["phone"], {})
@Index("INDEX_TRANSACTION_ID", ["transactionId"], {})
@Index("UK_primary_id", ["id"], { unique: true })
@Entity("product_order", { schema: "sff" })
export class ProductOrder extends BaseEntity {
  @Column("bigint", {
    primary: true,
    name: "id",
    comment: "记录唯一标识id",
    unsigned: true,
  })
  id: string;

  @Column("varchar", { name: "payment_type", length: 255 })
  paymentType: string;

  @Column("varchar", { name: "transaction_id", length: 255 })
  transactionId: string;

  @Column("varchar", { name: "payment_id", length: 255 })
  paymentId: string;

  @Column("int", {
    name: "order_status",
    comment: "transaction status, 1000=pending, 2000=success, 3000/5000=failed",
  })
  orderStatus: number;

  @Column("decimal", { name: "amount", precision: 19, scale: 2 })
  amount: string;

  @Column("decimal", {
    name: "amount_received",
    precision: 19,
    scale: 2,
    default: () => "'0.00'",
  })
  amountReceived: string;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("datetime", { name: "order_time" })
  orderTime: Date;

  @Column("longtext", { name: "product_info" })
  productInfo: string;

  @Column("varchar", { name: "shipping_name", length: 255 })
  shippingName: string;

  @Column("varchar", { name: "shipping_email", length: 255 })
  shippingEmail: string;

  @Column("varchar", { name: "shipping_phone", length: 255 })
  shippingPhone: string;

  @Column("varchar", { name: "shipping_country", length: 255 })
  shippingCountry: string;

  @Column("varchar", { name: "shipping_state", length: 255 })
  shippingState: string;

  @Column("varchar", { name: "shipping_city", length: 255 })
  shippingCity: string;

  @Column("varchar", { name: "shipping_line1", length: 255 })
  shippingLine1: string;

  @Column("varchar", { name: "shipping_line2", length: 255 })
  shippingLine2: string;

  @Column("varchar", { name: "shipping_postal_code", length: 255 })
  shippingPostalCode: string;

  @Column("int", { name: "shipping_status" })
  shippingStatus: number;

  @Column("varchar", { name: "shipping_status_note", length: 255 })
  shippingStatusNote: string;

  @Column("tinyint", {
    name: "status",
    comment: "对应记录是否可用，1可用，0不可用",
    unsigned: true,
    default: () => "'1'",
  })
  status: number;

  @Column("varchar", { name: "remark", comment: "对应记录备注", length: 500 })
  remark: string;

  @Column("int", {
    name: "version",
    comment: "对应记录的修订版本号,乐观锁",
    unsigned: true,
    default: () => "'0'",
  })
  version: number;

  @Column("datetime", {
    name: "create_time",
    comment: "对应记录的创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("varchar", {
    name: "create_by",
    comment: "对应记录的创建者",
    length: 64,
  })
  createBy: string;

  @Column("datetime", {
    name: "update_time",
    comment: "对应记录的最后修改时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date;

  @Column("varchar", {
    name: "update_by",
    comment: "对应记录的最后修改者",
    length: 64,
  })
  updateBy: string;
}
