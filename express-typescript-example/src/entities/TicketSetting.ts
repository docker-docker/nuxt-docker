import { BaseEntity, Column, Entity, Index } from "typeorm";

@Index("UK_primary_id", ["id"], { unique: true })
@Entity("ticket_setting", { schema: "sff" })
export class TicketSetting extends BaseEntity {
  @Column("bigint", {
    primary: true,
    name: "id",
    comment: "记录唯一标识id",
    unsigned: true,
  })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("decimal", {
    name: "adult_price",
    precision: 19,
    scale: 2,
    default: () => "'0.00'",
  })
  adultPrice: string;

  @Column("varchar", { name: "adult_product_id", length: 255 })
  adultProductId: string;

  @Column("varchar", { name: "adult_price_id", length: 255 })
  adultPriceId: string;

  @Column("decimal", {
    name: "children_price",
    precision: 19,
    scale: 2,
    default: () => "'0.00'",
  })
  childrenPrice: string;

  @Column("varchar", {
    name: "children_product_id",
    nullable: true,
    length: 255,
  })
  childrenProductId: string | null;

  @Column("varchar", { name: "children_price_id", length: 255 })
  childrenPriceId: string;

  @Column("decimal", {
    name: "baby_price",
    unsigned: true,
    precision: 19,
    scale: 2,
    default: () => "'0.00'",
  })
  babyPrice: string;

  @Column("varchar", { name: "baby_price_id", length: 255 })
  babyPriceId: string;

  @Column("decimal", {
    name: "group_price",
    precision: 19,
    scale: 2,
    default: () => "'0.00'",
  })
  groupPrice: string;

  @Column("varchar", { name: "group_product_id", length: 255 })
  groupProductId: string;

  @Column("varchar", { name: "group_price_id", length: 255 })
  groupPriceId: string;

  @Column("varchar", { name: "product_img", length: 255 })
  productImg: string;

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
