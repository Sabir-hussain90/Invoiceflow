import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoicePayload>;
export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type InvoiceAvgAggregateOutputType = {
    printedCount: number | null;
};
export type InvoiceSumAggregateOutputType = {
    printedCount: number | null;
};
export type InvoiceMinAggregateOutputType = {
    id: string | null;
    saleId: string | null;
    shopId: string | null;
    invoiceNumber: string | null;
    pdfUrl: string | null;
    pdfGeneratedAt: Date | null;
    printedCount: number | null;
    lastPrintedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceMaxAggregateOutputType = {
    id: string | null;
    saleId: string | null;
    shopId: string | null;
    invoiceNumber: string | null;
    pdfUrl: string | null;
    pdfGeneratedAt: Date | null;
    printedCount: number | null;
    lastPrintedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceCountAggregateOutputType = {
    id: number;
    saleId: number;
    shopId: number;
    invoiceNumber: number;
    pdfUrl: number;
    pdfGeneratedAt: number;
    printedCount: number;
    lastPrintedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InvoiceAvgAggregateInputType = {
    printedCount?: true;
};
export type InvoiceSumAggregateInputType = {
    printedCount?: true;
};
export type InvoiceMinAggregateInputType = {
    id?: true;
    saleId?: true;
    shopId?: true;
    invoiceNumber?: true;
    pdfUrl?: true;
    pdfGeneratedAt?: true;
    printedCount?: true;
    lastPrintedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceMaxAggregateInputType = {
    id?: true;
    saleId?: true;
    shopId?: true;
    invoiceNumber?: true;
    pdfUrl?: true;
    pdfGeneratedAt?: true;
    printedCount?: true;
    lastPrintedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceCountAggregateInputType = {
    id?: true;
    saleId?: true;
    shopId?: true;
    invoiceNumber?: true;
    pdfUrl?: true;
    pdfGeneratedAt?: true;
    printedCount?: true;
    lastPrintedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceCountAggregateInputType;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoice[P]> : Prisma.GetScalarType<T[P], AggregateInvoice[P]>;
};
export type InvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithAggregationInput | Prisma.InvoiceOrderByWithAggregationInput[];
    by: Prisma.InvoiceScalarFieldEnum[] | Prisma.InvoiceScalarFieldEnum;
    having?: Prisma.InvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceCountAggregateInputType | true;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type InvoiceGroupByOutputType = {
    id: string;
    saleId: string;
    shopId: string;
    invoiceNumber: string;
    pdfUrl: string | null;
    pdfGeneratedAt: Date | null;
    printedCount: number;
    lastPrintedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]>;
}>>;
export type InvoiceWhereInput = {
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    saleId?: Prisma.StringFilter<"Invoice"> | string;
    shopId?: Prisma.StringFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringFilter<"Invoice"> | string;
    pdfUrl?: Prisma.StringNullableFilter<"Invoice"> | string | null;
    pdfGeneratedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    printedCount?: Prisma.IntFilter<"Invoice"> | number;
    lastPrintedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
};
export type InvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    pdfUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    pdfGeneratedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    printedCount?: Prisma.SortOrder;
    lastPrintedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    sale?: Prisma.SaleOrderByWithRelationInput;
    shop?: Prisma.ShopOrderByWithRelationInput;
};
export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    saleId?: string;
    invoiceNumber?: string;
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    shopId?: Prisma.StringFilter<"Invoice"> | string;
    pdfUrl?: Prisma.StringNullableFilter<"Invoice"> | string | null;
    pdfGeneratedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    printedCount?: Prisma.IntFilter<"Invoice"> | number;
    lastPrintedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
}, "id" | "saleId" | "invoiceNumber">;
export type InvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    pdfUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    pdfGeneratedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    printedCount?: Prisma.SortOrder;
    lastPrintedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InvoiceCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceSumOrderByAggregateInput;
};
export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    saleId?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    shopId?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    pdfUrl?: Prisma.StringNullableWithAggregatesFilter<"Invoice"> | string | null;
    pdfGeneratedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null;
    printedCount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    lastPrintedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateInput = {
    id?: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sale: Prisma.SaleCreateNestedOneWithoutInvoiceInput;
    shop: Prisma.ShopCreateNestedOneWithoutInvoicesInput;
};
export type InvoiceUncheckedCreateInput = {
    id?: string;
    saleId: string;
    shopId: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sale?: Prisma.SaleUpdateOneRequiredWithoutInvoiceNestedInput;
    shop?: Prisma.ShopUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type InvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCreateManyInput = {
    id?: string;
    saleId: string;
    shopId: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceListRelationFilter = {
    every?: Prisma.InvoiceWhereInput;
    some?: Prisma.InvoiceWhereInput;
    none?: Prisma.InvoiceWhereInput;
};
export type InvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvoiceNullableScalarRelationFilter = {
    is?: Prisma.InvoiceWhereInput | null;
    isNot?: Prisma.InvoiceWhereInput | null;
};
export type InvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    pdfUrl?: Prisma.SortOrder;
    pdfGeneratedAt?: Prisma.SortOrder;
    printedCount?: Prisma.SortOrder;
    lastPrintedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceAvgOrderByAggregateInput = {
    printedCount?: Prisma.SortOrder;
};
export type InvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    pdfUrl?: Prisma.SortOrder;
    pdfGeneratedAt?: Prisma.SortOrder;
    printedCount?: Prisma.SortOrder;
    lastPrintedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    pdfUrl?: Prisma.SortOrder;
    pdfGeneratedAt?: Prisma.SortOrder;
    printedCount?: Prisma.SortOrder;
    lastPrintedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceSumOrderByAggregateInput = {
    printedCount?: Prisma.SortOrder;
};
export type InvoiceCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput> | Prisma.InvoiceCreateWithoutShopInput[] | Prisma.InvoiceUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutShopInput | Prisma.InvoiceCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.InvoiceCreateManyShopInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput> | Prisma.InvoiceCreateWithoutShopInput[] | Prisma.InvoiceUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutShopInput | Prisma.InvoiceCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.InvoiceCreateManyShopInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput> | Prisma.InvoiceCreateWithoutShopInput[] | Prisma.InvoiceUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutShopInput | Prisma.InvoiceCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutShopInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.InvoiceCreateManyShopInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutShopInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutShopInput | Prisma.InvoiceUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput> | Prisma.InvoiceCreateWithoutShopInput[] | Prisma.InvoiceUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutShopInput | Prisma.InvoiceCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutShopInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.InvoiceCreateManyShopInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutShopInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutShopInput | Prisma.InvoiceUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceCreateNestedOneWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutSaleInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUncheckedCreateNestedOneWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutSaleInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateOneWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutSaleInput;
    upsert?: Prisma.InvoiceUpsertWithoutSaleInput;
    disconnect?: Prisma.InvoiceWhereInput | boolean;
    delete?: Prisma.InvoiceWhereInput | boolean;
    connect?: Prisma.InvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvoiceUpdateToOneWithWhereWithoutSaleInput, Prisma.InvoiceUpdateWithoutSaleInput>, Prisma.InvoiceUncheckedUpdateWithoutSaleInput>;
};
export type InvoiceUncheckedUpdateOneWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutSaleInput;
    upsert?: Prisma.InvoiceUpsertWithoutSaleInput;
    disconnect?: Prisma.InvoiceWhereInput | boolean;
    delete?: Prisma.InvoiceWhereInput | boolean;
    connect?: Prisma.InvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvoiceUpdateToOneWithWhereWithoutSaleInput, Prisma.InvoiceUpdateWithoutSaleInput>, Prisma.InvoiceUncheckedUpdateWithoutSaleInput>;
};
export type InvoiceCreateWithoutShopInput = {
    id?: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sale: Prisma.SaleCreateNestedOneWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateWithoutShopInput = {
    id?: string;
    saleId: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceCreateOrConnectWithoutShopInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput>;
};
export type InvoiceCreateManyShopInputEnvelope = {
    data: Prisma.InvoiceCreateManyShopInput | Prisma.InvoiceCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type InvoiceUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutShopInput, Prisma.InvoiceUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutShopInput, Prisma.InvoiceUncheckedCreateWithoutShopInput>;
};
export type InvoiceUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutShopInput, Prisma.InvoiceUncheckedUpdateWithoutShopInput>;
};
export type InvoiceUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.InvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyWithoutShopInput>;
};
export type InvoiceScalarWhereInput = {
    AND?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    OR?: Prisma.InvoiceScalarWhereInput[];
    NOT?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    saleId?: Prisma.StringFilter<"Invoice"> | string;
    shopId?: Prisma.StringFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringFilter<"Invoice"> | string;
    pdfUrl?: Prisma.StringNullableFilter<"Invoice"> | string | null;
    pdfGeneratedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    printedCount?: Prisma.IntFilter<"Invoice"> | number;
    lastPrintedAt?: Prisma.DateTimeNullableFilter<"Invoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateWithoutSaleInput = {
    id?: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutInvoicesInput;
};
export type InvoiceUncheckedCreateWithoutSaleInput = {
    id?: string;
    shopId: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceCreateOrConnectWithoutSaleInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
};
export type InvoiceUpsertWithoutSaleInput = {
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutSaleInput, Prisma.InvoiceUncheckedUpdateWithoutSaleInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutSaleInput, Prisma.InvoiceUncheckedCreateWithoutSaleInput>;
    where?: Prisma.InvoiceWhereInput;
};
export type InvoiceUpdateToOneWithWhereWithoutSaleInput = {
    where?: Prisma.InvoiceWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutSaleInput, Prisma.InvoiceUncheckedUpdateWithoutSaleInput>;
};
export type InvoiceUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type InvoiceUncheckedUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCreateManyShopInput = {
    id?: string;
    saleId: string;
    invoiceNumber: string;
    pdfUrl?: string | null;
    pdfGeneratedAt?: Date | string | null;
    printedCount?: number;
    lastPrintedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sale?: Prisma.SaleUpdateOneRequiredWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pdfGeneratedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    printedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastPrintedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    saleId?: boolean;
    shopId?: boolean;
    invoiceNumber?: boolean;
    pdfUrl?: boolean;
    pdfGeneratedAt?: boolean;
    printedCount?: boolean;
    lastPrintedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    saleId?: boolean;
    shopId?: boolean;
    invoiceNumber?: boolean;
    pdfUrl?: boolean;
    pdfGeneratedAt?: boolean;
    printedCount?: boolean;
    lastPrintedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    saleId?: boolean;
    shopId?: boolean;
    invoiceNumber?: boolean;
    pdfUrl?: boolean;
    pdfGeneratedAt?: boolean;
    printedCount?: boolean;
    lastPrintedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectScalar = {
    id?: boolean;
    saleId?: boolean;
    shopId?: boolean;
    invoiceNumber?: boolean;
    pdfUrl?: boolean;
    pdfGeneratedAt?: boolean;
    printedCount?: boolean;
    lastPrintedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "saleId" | "shopId" | "invoiceNumber" | "pdfUrl" | "pdfGeneratedAt" | "printedCount" | "lastPrintedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>;
export type InvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type $InvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Invoice";
    objects: {
        sale: Prisma.$SalePayload<ExtArgs>;
        shop: Prisma.$ShopPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        saleId: string;
        shopId: string;
        invoiceNumber: string;
        pdfUrl: string | null;
        pdfGeneratedAt: Date | null;
        printedCount: number;
        lastPrintedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["invoice"]>;
    composites: {};
};
export type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoicePayload, S>;
export type InvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceCountAggregateInputType | true;
};
export interface InvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Invoice'];
        meta: {
            name: 'Invoice';
        };
    };
    findUnique<T extends InvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceCreateArgs>(args: Prisma.SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceCountArgs>(args?: Prisma.Subset<T, InvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceAggregateArgs>(args: Prisma.Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>;
    groupBy<T extends InvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceFieldRefs;
}
export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sale<T extends Prisma.SaleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    shop<T extends Prisma.ShopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"Invoice", 'String'>;
    readonly saleId: Prisma.FieldRef<"Invoice", 'String'>;
    readonly shopId: Prisma.FieldRef<"Invoice", 'String'>;
    readonly invoiceNumber: Prisma.FieldRef<"Invoice", 'String'>;
    readonly pdfUrl: Prisma.FieldRef<"Invoice", 'String'>;
    readonly pdfGeneratedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly printedCount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly lastPrintedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
}
export type InvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
};
export type InvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
    include?: Prisma.InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
};
export type InvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
};
