import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReturnItemModel = runtime.Types.Result.DefaultSelection<Prisma.$ReturnItemPayload>;
export type AggregateReturnItem = {
    _count: ReturnItemCountAggregateOutputType | null;
    _avg: ReturnItemAvgAggregateOutputType | null;
    _sum: ReturnItemSumAggregateOutputType | null;
    _min: ReturnItemMinAggregateOutputType | null;
    _max: ReturnItemMaxAggregateOutputType | null;
};
export type ReturnItemAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    lineTotal: runtime.Decimal | null;
};
export type ReturnItemSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    lineTotal: runtime.Decimal | null;
};
export type ReturnItemMinAggregateOutputType = {
    id: string | null;
    returnId: string | null;
    saleItemId: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    lineTotal: runtime.Decimal | null;
    restocked: boolean | null;
    createdAt: Date | null;
};
export type ReturnItemMaxAggregateOutputType = {
    id: string | null;
    returnId: string | null;
    saleItemId: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    lineTotal: runtime.Decimal | null;
    restocked: boolean | null;
    createdAt: Date | null;
};
export type ReturnItemCountAggregateOutputType = {
    id: number;
    returnId: number;
    saleItemId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    restocked: number;
    createdAt: number;
    _all: number;
};
export type ReturnItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    lineTotal?: true;
};
export type ReturnItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    lineTotal?: true;
};
export type ReturnItemMinAggregateInputType = {
    id?: true;
    returnId?: true;
    saleItemId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    lineTotal?: true;
    restocked?: true;
    createdAt?: true;
};
export type ReturnItemMaxAggregateInputType = {
    id?: true;
    returnId?: true;
    saleItemId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    lineTotal?: true;
    restocked?: true;
    createdAt?: true;
};
export type ReturnItemCountAggregateInputType = {
    id?: true;
    returnId?: true;
    saleItemId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    lineTotal?: true;
    restocked?: true;
    createdAt?: true;
    _all?: true;
};
export type ReturnItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithRelationInput | Prisma.ReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.ReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReturnItemCountAggregateInputType;
    _avg?: ReturnItemAvgAggregateInputType;
    _sum?: ReturnItemSumAggregateInputType;
    _min?: ReturnItemMinAggregateInputType;
    _max?: ReturnItemMaxAggregateInputType;
};
export type GetReturnItemAggregateType<T extends ReturnItemAggregateArgs> = {
    [P in keyof T & keyof AggregateReturnItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReturnItem[P]> : Prisma.GetScalarType<T[P], AggregateReturnItem[P]>;
};
export type ReturnItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithAggregationInput | Prisma.ReturnItemOrderByWithAggregationInput[];
    by: Prisma.ReturnItemScalarFieldEnum[] | Prisma.ReturnItemScalarFieldEnum;
    having?: Prisma.ReturnItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReturnItemCountAggregateInputType | true;
    _avg?: ReturnItemAvgAggregateInputType;
    _sum?: ReturnItemSumAggregateInputType;
    _min?: ReturnItemMinAggregateInputType;
    _max?: ReturnItemMaxAggregateInputType;
};
export type ReturnItemGroupByOutputType = {
    id: string;
    returnId: string;
    saleItemId: string;
    productId: string;
    quantity: runtime.Decimal;
    unitPrice: runtime.Decimal;
    lineTotal: runtime.Decimal;
    restocked: boolean;
    createdAt: Date;
    _count: ReturnItemCountAggregateOutputType | null;
    _avg: ReturnItemAvgAggregateOutputType | null;
    _sum: ReturnItemSumAggregateOutputType | null;
    _min: ReturnItemMinAggregateOutputType | null;
    _max: ReturnItemMaxAggregateOutputType | null;
};
export type GetReturnItemGroupByPayload<T extends ReturnItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReturnItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReturnItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReturnItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReturnItemGroupByOutputType[P]>;
}>>;
export type ReturnItemWhereInput = {
    AND?: Prisma.ReturnItemWhereInput | Prisma.ReturnItemWhereInput[];
    OR?: Prisma.ReturnItemWhereInput[];
    NOT?: Prisma.ReturnItemWhereInput | Prisma.ReturnItemWhereInput[];
    id?: Prisma.StringFilter<"ReturnItem"> | string;
    returnId?: Prisma.StringFilter<"ReturnItem"> | string;
    saleItemId?: Prisma.StringFilter<"ReturnItem"> | string;
    productId?: Prisma.StringFilter<"ReturnItem"> | string;
    quantity?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFilter<"ReturnItem"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ReturnItem"> | Date | string;
    return?: Prisma.XOR<Prisma.ReturnScalarRelationFilter, Prisma.ReturnWhereInput>;
    saleItem?: Prisma.XOR<Prisma.SaleItemScalarRelationFilter, Prisma.SaleItemWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ReturnItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    saleItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
    restocked?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    return?: Prisma.ReturnOrderByWithRelationInput;
    saleItem?: Prisma.SaleItemOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ReturnItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReturnItemWhereInput | Prisma.ReturnItemWhereInput[];
    OR?: Prisma.ReturnItemWhereInput[];
    NOT?: Prisma.ReturnItemWhereInput | Prisma.ReturnItemWhereInput[];
    returnId?: Prisma.StringFilter<"ReturnItem"> | string;
    saleItemId?: Prisma.StringFilter<"ReturnItem"> | string;
    productId?: Prisma.StringFilter<"ReturnItem"> | string;
    quantity?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFilter<"ReturnItem"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ReturnItem"> | Date | string;
    return?: Prisma.XOR<Prisma.ReturnScalarRelationFilter, Prisma.ReturnWhereInput>;
    saleItem?: Prisma.XOR<Prisma.SaleItemScalarRelationFilter, Prisma.SaleItemWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type ReturnItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    saleItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
    restocked?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReturnItemCountOrderByAggregateInput;
    _avg?: Prisma.ReturnItemAvgOrderByAggregateInput;
    _max?: Prisma.ReturnItemMaxOrderByAggregateInput;
    _min?: Prisma.ReturnItemMinOrderByAggregateInput;
    _sum?: Prisma.ReturnItemSumOrderByAggregateInput;
};
export type ReturnItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReturnItemScalarWhereWithAggregatesInput | Prisma.ReturnItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReturnItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReturnItemScalarWhereWithAggregatesInput | Prisma.ReturnItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ReturnItem"> | string;
    returnId?: Prisma.StringWithAggregatesFilter<"ReturnItem"> | string;
    saleItemId?: Prisma.StringWithAggregatesFilter<"ReturnItem"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ReturnItem"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalWithAggregatesFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolWithAggregatesFilter<"ReturnItem"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ReturnItem"> | Date | string;
};
export type ReturnItemCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
    return: Prisma.ReturnCreateNestedOneWithoutItemsInput;
    saleItem: Prisma.SaleItemCreateNestedOneWithoutReturnItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutReturnItemsInput;
};
export type ReturnItemUncheckedCreateInput = {
    id?: string;
    returnId: string;
    saleItemId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    return?: Prisma.ReturnUpdateOneRequiredWithoutItemsNestedInput;
    saleItem?: Prisma.SaleItemUpdateOneRequiredWithoutReturnItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutReturnItemsNestedInput;
};
export type ReturnItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemCreateManyInput = {
    id?: string;
    returnId: string;
    saleItemId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemListRelationFilter = {
    every?: Prisma.ReturnItemWhereInput;
    some?: Prisma.ReturnItemWhereInput;
    none?: Prisma.ReturnItemWhereInput;
};
export type ReturnItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReturnItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    saleItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
    restocked?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReturnItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
};
export type ReturnItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    saleItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
    restocked?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReturnItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    saleItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
    restocked?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReturnItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    lineTotal?: Prisma.SortOrder;
};
export type ReturnItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput> | Prisma.ReturnItemCreateWithoutProductInput[] | Prisma.ReturnItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutProductInput | Prisma.ReturnItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ReturnItemCreateManyProductInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput> | Prisma.ReturnItemCreateWithoutProductInput[] | Prisma.ReturnItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutProductInput | Prisma.ReturnItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ReturnItemCreateManyProductInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput> | Prisma.ReturnItemCreateWithoutProductInput[] | Prisma.ReturnItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutProductInput | Prisma.ReturnItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutProductInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ReturnItemCreateManyProductInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutProductInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutProductInput | Prisma.ReturnItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput> | Prisma.ReturnItemCreateWithoutProductInput[] | Prisma.ReturnItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutProductInput | Prisma.ReturnItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutProductInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ReturnItemCreateManyProductInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutProductInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutProductInput | Prisma.ReturnItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemCreateNestedManyWithoutSaleItemInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput> | Prisma.ReturnItemCreateWithoutSaleItemInput[] | Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput | Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput[];
    createMany?: Prisma.ReturnItemCreateManySaleItemInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUncheckedCreateNestedManyWithoutSaleItemInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput> | Prisma.ReturnItemCreateWithoutSaleItemInput[] | Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput | Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput[];
    createMany?: Prisma.ReturnItemCreateManySaleItemInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUpdateManyWithoutSaleItemNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput> | Prisma.ReturnItemCreateWithoutSaleItemInput[] | Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput | Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutSaleItemInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutSaleItemInput[];
    createMany?: Prisma.ReturnItemCreateManySaleItemInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutSaleItemInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutSaleItemInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutSaleItemInput | Prisma.ReturnItemUpdateManyWithWhereWithoutSaleItemInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemUncheckedUpdateManyWithoutSaleItemNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput> | Prisma.ReturnItemCreateWithoutSaleItemInput[] | Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput | Prisma.ReturnItemCreateOrConnectWithoutSaleItemInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutSaleItemInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutSaleItemInput[];
    createMany?: Prisma.ReturnItemCreateManySaleItemInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutSaleItemInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutSaleItemInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutSaleItemInput | Prisma.ReturnItemUpdateManyWithWhereWithoutSaleItemInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemCreateNestedManyWithoutReturnInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput> | Prisma.ReturnItemCreateWithoutReturnInput[] | Prisma.ReturnItemUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutReturnInput | Prisma.ReturnItemCreateOrConnectWithoutReturnInput[];
    createMany?: Prisma.ReturnItemCreateManyReturnInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUncheckedCreateNestedManyWithoutReturnInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput> | Prisma.ReturnItemCreateWithoutReturnInput[] | Prisma.ReturnItemUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutReturnInput | Prisma.ReturnItemCreateOrConnectWithoutReturnInput[];
    createMany?: Prisma.ReturnItemCreateManyReturnInputEnvelope;
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
};
export type ReturnItemUpdateManyWithoutReturnNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput> | Prisma.ReturnItemCreateWithoutReturnInput[] | Prisma.ReturnItemUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutReturnInput | Prisma.ReturnItemCreateOrConnectWithoutReturnInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutReturnInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutReturnInput[];
    createMany?: Prisma.ReturnItemCreateManyReturnInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutReturnInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutReturnInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutReturnInput | Prisma.ReturnItemUpdateManyWithWhereWithoutReturnInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemUncheckedUpdateManyWithoutReturnNestedInput = {
    create?: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput> | Prisma.ReturnItemCreateWithoutReturnInput[] | Prisma.ReturnItemUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.ReturnItemCreateOrConnectWithoutReturnInput | Prisma.ReturnItemCreateOrConnectWithoutReturnInput[];
    upsert?: Prisma.ReturnItemUpsertWithWhereUniqueWithoutReturnInput | Prisma.ReturnItemUpsertWithWhereUniqueWithoutReturnInput[];
    createMany?: Prisma.ReturnItemCreateManyReturnInputEnvelope;
    set?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    disconnect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    delete?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    connect?: Prisma.ReturnItemWhereUniqueInput | Prisma.ReturnItemWhereUniqueInput[];
    update?: Prisma.ReturnItemUpdateWithWhereUniqueWithoutReturnInput | Prisma.ReturnItemUpdateWithWhereUniqueWithoutReturnInput[];
    updateMany?: Prisma.ReturnItemUpdateManyWithWhereWithoutReturnInput | Prisma.ReturnItemUpdateManyWithWhereWithoutReturnInput[];
    deleteMany?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
};
export type ReturnItemCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
    return: Prisma.ReturnCreateNestedOneWithoutItemsInput;
    saleItem: Prisma.SaleItemCreateNestedOneWithoutReturnItemsInput;
};
export type ReturnItemUncheckedCreateWithoutProductInput = {
    id?: string;
    returnId: string;
    saleItemId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemCreateOrConnectWithoutProductInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput>;
};
export type ReturnItemCreateManyProductInputEnvelope = {
    data: Prisma.ReturnItemCreateManyProductInput | Prisma.ReturnItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ReturnItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnItemUpdateWithoutProductInput, Prisma.ReturnItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutProductInput, Prisma.ReturnItemUncheckedCreateWithoutProductInput>;
};
export type ReturnItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateWithoutProductInput, Prisma.ReturnItemUncheckedUpdateWithoutProductInput>;
};
export type ReturnItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateManyMutationInput, Prisma.ReturnItemUncheckedUpdateManyWithoutProductInput>;
};
export type ReturnItemScalarWhereInput = {
    AND?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
    OR?: Prisma.ReturnItemScalarWhereInput[];
    NOT?: Prisma.ReturnItemScalarWhereInput | Prisma.ReturnItemScalarWhereInput[];
    id?: Prisma.StringFilter<"ReturnItem"> | string;
    returnId?: Prisma.StringFilter<"ReturnItem"> | string;
    saleItemId?: Prisma.StringFilter<"ReturnItem"> | string;
    productId?: Prisma.StringFilter<"ReturnItem"> | string;
    quantity?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFilter<"ReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFilter<"ReturnItem"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ReturnItem"> | Date | string;
};
export type ReturnItemCreateWithoutSaleItemInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
    return: Prisma.ReturnCreateNestedOneWithoutItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutReturnItemsInput;
};
export type ReturnItemUncheckedCreateWithoutSaleItemInput = {
    id?: string;
    returnId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemCreateOrConnectWithoutSaleItemInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput>;
};
export type ReturnItemCreateManySaleItemInputEnvelope = {
    data: Prisma.ReturnItemCreateManySaleItemInput | Prisma.ReturnItemCreateManySaleItemInput[];
    skipDuplicates?: boolean;
};
export type ReturnItemUpsertWithWhereUniqueWithoutSaleItemInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnItemUpdateWithoutSaleItemInput, Prisma.ReturnItemUncheckedUpdateWithoutSaleItemInput>;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutSaleItemInput, Prisma.ReturnItemUncheckedCreateWithoutSaleItemInput>;
};
export type ReturnItemUpdateWithWhereUniqueWithoutSaleItemInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateWithoutSaleItemInput, Prisma.ReturnItemUncheckedUpdateWithoutSaleItemInput>;
};
export type ReturnItemUpdateManyWithWhereWithoutSaleItemInput = {
    where: Prisma.ReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateManyMutationInput, Prisma.ReturnItemUncheckedUpdateManyWithoutSaleItemInput>;
};
export type ReturnItemCreateWithoutReturnInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
    saleItem: Prisma.SaleItemCreateNestedOneWithoutReturnItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutReturnItemsInput;
};
export type ReturnItemUncheckedCreateWithoutReturnInput = {
    id?: string;
    saleItemId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemCreateOrConnectWithoutReturnInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput>;
};
export type ReturnItemCreateManyReturnInputEnvelope = {
    data: Prisma.ReturnItemCreateManyReturnInput | Prisma.ReturnItemCreateManyReturnInput[];
    skipDuplicates?: boolean;
};
export type ReturnItemUpsertWithWhereUniqueWithoutReturnInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReturnItemUpdateWithoutReturnInput, Prisma.ReturnItemUncheckedUpdateWithoutReturnInput>;
    create: Prisma.XOR<Prisma.ReturnItemCreateWithoutReturnInput, Prisma.ReturnItemUncheckedCreateWithoutReturnInput>;
};
export type ReturnItemUpdateWithWhereUniqueWithoutReturnInput = {
    where: Prisma.ReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateWithoutReturnInput, Prisma.ReturnItemUncheckedUpdateWithoutReturnInput>;
};
export type ReturnItemUpdateManyWithWhereWithoutReturnInput = {
    where: Prisma.ReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ReturnItemUpdateManyMutationInput, Prisma.ReturnItemUncheckedUpdateManyWithoutReturnInput>;
};
export type ReturnItemCreateManyProductInput = {
    id?: string;
    returnId: string;
    saleItemId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    return?: Prisma.ReturnUpdateOneRequiredWithoutItemsNestedInput;
    saleItem?: Prisma.SaleItemUpdateOneRequiredWithoutReturnItemsNestedInput;
};
export type ReturnItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemCreateManySaleItemInput = {
    id?: string;
    returnId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemUpdateWithoutSaleItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    return?: Prisma.ReturnUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutReturnItemsNestedInput;
};
export type ReturnItemUncheckedUpdateWithoutSaleItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemUncheckedUpdateManyWithoutSaleItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemCreateManyReturnInput = {
    id?: string;
    saleItemId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: boolean;
    createdAt?: Date | string;
};
export type ReturnItemUpdateWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleItem?: Prisma.SaleItemUpdateOneRequiredWithoutReturnItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutReturnItemsNestedInput;
};
export type ReturnItemUncheckedUpdateWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemUncheckedUpdateManyWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    saleItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lineTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    restocked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReturnItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    returnId?: boolean;
    saleItemId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    lineTotal?: boolean;
    restocked?: boolean;
    createdAt?: boolean;
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["returnItem"]>;
export type ReturnItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    returnId?: boolean;
    saleItemId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    lineTotal?: boolean;
    restocked?: boolean;
    createdAt?: boolean;
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["returnItem"]>;
export type ReturnItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    returnId?: boolean;
    saleItemId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    lineTotal?: boolean;
    restocked?: boolean;
    createdAt?: boolean;
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["returnItem"]>;
export type ReturnItemSelectScalar = {
    id?: boolean;
    returnId?: boolean;
    saleItemId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    lineTotal?: boolean;
    restocked?: boolean;
    createdAt?: boolean;
};
export type ReturnItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "returnId" | "saleItemId" | "productId" | "quantity" | "unitPrice" | "lineTotal" | "restocked" | "createdAt", ExtArgs["result"]["returnItem"]>;
export type ReturnItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ReturnItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ReturnItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.ReturnDefaultArgs<ExtArgs>;
    saleItem?: boolean | Prisma.SaleItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ReturnItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReturnItem";
    objects: {
        return: Prisma.$ReturnPayload<ExtArgs>;
        saleItem: Prisma.$SaleItemPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        returnId: string;
        saleItemId: string;
        productId: string;
        quantity: runtime.Decimal;
        unitPrice: runtime.Decimal;
        lineTotal: runtime.Decimal;
        restocked: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["returnItem"]>;
    composites: {};
};
export type ReturnItemGetPayload<S extends boolean | null | undefined | ReturnItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload, S>;
export type ReturnItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReturnItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReturnItemCountAggregateInputType | true;
};
export interface ReturnItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReturnItem'];
        meta: {
            name: 'ReturnItem';
        };
    };
    findUnique<T extends ReturnItemFindUniqueArgs>(args: Prisma.SelectSubset<T, ReturnItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReturnItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReturnItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReturnItemFindFirstArgs>(args?: Prisma.SelectSubset<T, ReturnItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReturnItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReturnItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReturnItemFindManyArgs>(args?: Prisma.SelectSubset<T, ReturnItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReturnItemCreateArgs>(args: Prisma.SelectSubset<T, ReturnItemCreateArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReturnItemCreateManyArgs>(args?: Prisma.SelectSubset<T, ReturnItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReturnItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReturnItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReturnItemDeleteArgs>(args: Prisma.SelectSubset<T, ReturnItemDeleteArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReturnItemUpdateArgs>(args: Prisma.SelectSubset<T, ReturnItemUpdateArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReturnItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReturnItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReturnItemUpdateManyArgs>(args: Prisma.SelectSubset<T, ReturnItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReturnItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReturnItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReturnItemUpsertArgs>(args: Prisma.SelectSubset<T, ReturnItemUpsertArgs<ExtArgs>>): Prisma.Prisma__ReturnItemClient<runtime.Types.Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReturnItemCountArgs>(args?: Prisma.Subset<T, ReturnItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReturnItemCountAggregateOutputType> : number>;
    aggregate<T extends ReturnItemAggregateArgs>(args: Prisma.Subset<T, ReturnItemAggregateArgs>): Prisma.PrismaPromise<GetReturnItemAggregateType<T>>;
    groupBy<T extends ReturnItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReturnItemGroupByArgs['orderBy'];
    } : {
        orderBy?: ReturnItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReturnItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReturnItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReturnItemFieldRefs;
}
export interface Prisma__ReturnItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    return<T extends Prisma.ReturnDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReturnDefaultArgs<ExtArgs>>): Prisma.Prisma__ReturnClient<runtime.Types.Result.GetResult<Prisma.$ReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    saleItem<T extends Prisma.SaleItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleItemDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleItemClient<runtime.Types.Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReturnItemFieldRefs {
    readonly id: Prisma.FieldRef<"ReturnItem", 'String'>;
    readonly returnId: Prisma.FieldRef<"ReturnItem", 'String'>;
    readonly saleItemId: Prisma.FieldRef<"ReturnItem", 'String'>;
    readonly productId: Prisma.FieldRef<"ReturnItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"ReturnItem", 'Decimal'>;
    readonly unitPrice: Prisma.FieldRef<"ReturnItem", 'Decimal'>;
    readonly lineTotal: Prisma.FieldRef<"ReturnItem", 'Decimal'>;
    readonly restocked: Prisma.FieldRef<"ReturnItem", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ReturnItem", 'DateTime'>;
}
export type ReturnItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where: Prisma.ReturnItemWhereUniqueInput;
};
export type ReturnItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where: Prisma.ReturnItemWhereUniqueInput;
};
export type ReturnItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithRelationInput | Prisma.ReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.ReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnItemScalarFieldEnum | Prisma.ReturnItemScalarFieldEnum[];
};
export type ReturnItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithRelationInput | Prisma.ReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.ReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnItemScalarFieldEnum | Prisma.ReturnItemScalarFieldEnum[];
};
export type ReturnItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where?: Prisma.ReturnItemWhereInput;
    orderBy?: Prisma.ReturnItemOrderByWithRelationInput | Prisma.ReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.ReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReturnItemScalarFieldEnum | Prisma.ReturnItemScalarFieldEnum[];
};
export type ReturnItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnItemCreateInput, Prisma.ReturnItemUncheckedCreateInput>;
};
export type ReturnItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReturnItemCreateManyInput | Prisma.ReturnItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReturnItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    data: Prisma.ReturnItemCreateManyInput | Prisma.ReturnItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReturnItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReturnItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnItemUpdateInput, Prisma.ReturnItemUncheckedUpdateInput>;
    where: Prisma.ReturnItemWhereUniqueInput;
};
export type ReturnItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReturnItemUpdateManyMutationInput, Prisma.ReturnItemUncheckedUpdateManyInput>;
    where?: Prisma.ReturnItemWhereInput;
    limit?: number;
};
export type ReturnItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReturnItemUpdateManyMutationInput, Prisma.ReturnItemUncheckedUpdateManyInput>;
    where?: Prisma.ReturnItemWhereInput;
    limit?: number;
    include?: Prisma.ReturnItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReturnItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where: Prisma.ReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReturnItemCreateInput, Prisma.ReturnItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReturnItemUpdateInput, Prisma.ReturnItemUncheckedUpdateInput>;
};
export type ReturnItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
    where: Prisma.ReturnItemWhereUniqueInput;
};
export type ReturnItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReturnItemWhereInput;
    limit?: number;
};
export type ReturnItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.ReturnItemOmit<ExtArgs> | null;
    include?: Prisma.ReturnItemInclude<ExtArgs> | null;
};
