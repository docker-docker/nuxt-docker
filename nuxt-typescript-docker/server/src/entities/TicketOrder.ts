import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('id', ['id'], {})
@Index('INDEX_EMAIL', ['email'], {})
@Index('INDEX_ORDER_STATUS', ['orderStatus'], {})
@Index('INDEX_ORDER_TIME', ['orderTime'], {})
@Index('INDEX_PAYMENTID', ['paymentId'], {})
@Index('INDEX_PHONE', ['phone'], {})
@Index('INDEX_TRANSACTIONID', ['transactionId'], {})
@Entity('ticket_order', { schema: 'sff' })
export class TicketOrder extends BaseEntity {
  @Column('bigint', { primary: true, name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'payment_type', nullable: true, length: 255 })
  paymentType: string | null;

  @Column('varchar', { name: 'transaction_id', length: 500 })
  transactionId: string;

  @Column('varchar', { name: 'payment_id', length: 500 })
  paymentId: string;

  @Column('int', {
    name: 'order_status',
    comment: 'transaction status, 1000=pending, 2000=success, 3000/5000=failed'
  })
  orderStatus: number;

  @Column('decimal', {
    name: 'amount',
    precision: 19,
    scale: 2,
    default: () => "'0.00'"
  })
  amount: string;

  @Column('decimal', {
    name: 'amount_received',
    precision: 19,
    scale: 2,
    default: () => "'0.00'"
  })
  amountReceived: string;

  @Column('varchar', { name: 'first_name', length: 255 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255 })
  lastName: string;

  @Column('varchar', { name: 'phone', length: 255 })
  phone: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('int', { name: 'order_adult', default: () => "'0'" })
  orderAdult: number;

  @Column('int', { name: 'order_children', default: () => "'0'" })
  orderChildren: number;

  @Column('int', { name: 'order_baby', default: () => "'0'" })
  orderBaby: number;

  @Column('date', { name: 'order_date' })
  orderDate: string;

  @Column('time', { name: 'order_time' })
  orderTime: string;

  @Column('tinyint', { name: 'order_group', width: 1, default: () => "'0'" })
  orderGroup: boolean;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'1'" })
  status: boolean;

  @Column('varchar', { name: 'create_by', length: 255 })
  createBy: string;

  @Column('datetime', { name: 'create_time' })
  createTime: Date;

  @Column('varchar', { name: 'update_by', length: 255 })
  updateBy: string;

  @Column('datetime', {
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date;
}
