import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StockMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$StockMovementPayload>;
export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
export type StockMovementAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    balanceAfter: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
};
export type StockMovementSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    balanceAfter: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
};
export type StockMovementMinAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    productId: string | null;
    type: $Enums.StockMovementType | null;
    quantity: runtime.Decimal | null;
    balanceAfter: runtime.Decimal | null;
    referenceType: string | null;
    referenceId: string | null;
    reason: string | null;
    unitCost: runtime.Decimal | null;
    createdById: string | null;
    createdAt: Date | null;
};
export type StockMovementMaxAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    productId: string | null;
    type: $Enums.StockMovementType | null;
    quantity: runtime.Decimal | null;
    balanceAfter: runtime.Decimal | null;
    referenceType: string | null;
    referenceId: string | null;
    reason: string | null;
    unitCost: runtime.Decimal | null;
    createdById: string | null;
    createdAt: Date | null;
};
export type StockMovementCountAggregateOutputType = {
    id: number;
    shopId: number;
    productId: number;
    type: number;
    quantity: number;
    balanceAfter: number;
    referenceType: number;
    referenceId: number;
    reason: number;
    unitCost: number;
    createdById: number;
    createdAt: number;
    _all: number;
};
export type StockMovementAvgAggregateInputType = {
    quantity?: true;
    balanceAfter?: true;
    unitCost?: true;
};
export type StockMovementSumAggregateInputType = {
    quantity?: true;
    balanceAfter?: true;
    unitCost?: true;
};
export type StockMovementMinAggregateInputType = {
    id?: true;
    shopId?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    balanceAfter?: true;
    referenceType?: true;
    referenceId?: true;
    reason?: true;
    unitCost?: true;
    createdById?: true;
    createdAt?: true;
};
export type StockMovementMaxAggregateInputType = {
    id?: true;
    shopId?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    balanceAfter?: true;
    referenceType?: true;
    referenceId?: true;
    reason?: true;
    unitCost?: true;
    createdById?: true;
    createdAt?: true;
};
export type StockMovementCountAggregateInputType = {
    id?: true;
    shopId?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    balanceAfter?: true;
    referenceType?: true;
    referenceId?: true;
    reason?: true;
    unitCost?: true;
    createdById?: true;
    createdAt?: true;
    _all?: true;
};
export type StockMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StockMovementCountAggregateInputType;
    _avg?: StockMovementAvgAggregateInputType;
    _sum?: StockMovementSumAggregateInputType;
    _min?: StockMovementMinAggregateInputType;
    _max?: StockMovementMaxAggregateInputType;
};
export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockMovement[P]> : Prisma.GetScalarType<T[P], AggregateStockMovement[P]>;
};
export type StockMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithAggregationInput | Prisma.StockMovementOrderByWithAggregationInput[];
    by: Prisma.StockMovementScalarFieldEnum[] | Prisma.StockMovementScalarFieldEnum;
    having?: Prisma.StockMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockMovementCountAggregateInputType | true;
    _avg?: StockMovementAvgAggregateInputType;
    _sum?: StockMovementSumAggregateInputType;
    _min?: StockMovementMinAggregateInputType;
    _max?: StockMovementMaxAggregateInputType;
};
export type StockMovementGroupByOutputType = {
    id: string;
    shopId: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal;
    balanceAfter: runtime.Decimal;
    referenceType: string | null;
    referenceId: string | null;
    reason: string | null;
    unitCost: runtime.Decimal | null;
    createdById: string | null;
    createdAt: Date;
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
export type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]>;
}>>;
export type StockMovementWhereInput = {
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    id?: Prisma.StringFilter<"StockMovement"> | string;
    shopId?: Prisma.StringFilter<"StockMovement"> | string;
    productId?: Prisma.StringFilter<"StockMovement"> | string;
    type?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reason?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type StockMovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shop?: Prisma.ShopOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
};
export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    shopId?: Prisma.StringFilter<"StockMovement"> | string;
    productId?: Prisma.StringFilter<"StockMovement"> | string;
    type?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reason?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type StockMovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.StockMovementCountOrderByAggregateInput;
    _avg?: Prisma.StockMovementAvgOrderByAggregateInput;
    _max?: Prisma.StockMovementMaxOrderByAggregateInput;
    _min?: Prisma.StockMovementMinOrderByAggregateInput;
    _sum?: Prisma.StockMovementSumOrderByAggregateInput;
};
export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StockMovement"> | string;
    shopId?: Prisma.StringWithAggregatesFilter<"StockMovement"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"StockMovement"> | string;
    type?: Prisma.EnumStockMovementTypeWithAggregatesFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.DecimalWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    referenceId?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    unitCost?: Prisma.DecimalNullableWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StockMovement"> | Date | string;
};
export type StockMovementCreateInput = {
    id?: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutStockMovementsInput;
    product: Prisma.ProductCreateNestedOneWithoutStockMovementsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutStockMovementsInput;
};
export type StockMovementUncheckedCreateInput = {
    id?: string;
    shopId: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutStockMovementsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStockMovementsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutStockMovementsNestedInput;
};
export type StockMovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementCreateManyInput = {
    id?: string;
    shopId: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementListRelationFilter = {
    every?: Prisma.StockMovementWhereInput;
    some?: Prisma.StockMovementWhereInput;
    none?: Prisma.StockMovementWhereInput;
};
export type StockMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockMovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
};
export type StockMovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
};
export type StockMovementCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput> | Prisma.StockMovementCreateWithoutCreatedByInput[] | Prisma.StockMovementUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutCreatedByInput | Prisma.StockMovementCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.StockMovementCreateManyCreatedByInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput> | Prisma.StockMovementCreateWithoutCreatedByInput[] | Prisma.StockMovementUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutCreatedByInput | Prisma.StockMovementCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.StockMovementCreateManyCreatedByInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput> | Prisma.StockMovementCreateWithoutCreatedByInput[] | Prisma.StockMovementUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutCreatedByInput | Prisma.StockMovementCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.StockMovementCreateManyCreatedByInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutCreatedByInput | Prisma.StockMovementUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput> | Prisma.StockMovementCreateWithoutCreatedByInput[] | Prisma.StockMovementUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutCreatedByInput | Prisma.StockMovementCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.StockMovementCreateManyCreatedByInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutCreatedByInput | Prisma.StockMovementUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput> | Prisma.StockMovementCreateWithoutShopInput[] | Prisma.StockMovementUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutShopInput | Prisma.StockMovementCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.StockMovementCreateManyShopInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput> | Prisma.StockMovementCreateWithoutShopInput[] | Prisma.StockMovementUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutShopInput | Prisma.StockMovementCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.StockMovementCreateManyShopInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput> | Prisma.StockMovementCreateWithoutShopInput[] | Prisma.StockMovementUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutShopInput | Prisma.StockMovementCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutShopInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.StockMovementCreateManyShopInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutShopInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutShopInput | Prisma.StockMovementUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput> | Prisma.StockMovementCreateWithoutShopInput[] | Prisma.StockMovementUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutShopInput | Prisma.StockMovementCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutShopInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.StockMovementCreateManyShopInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutShopInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutShopInput | Prisma.StockMovementUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput> | Prisma.StockMovementCreateWithoutProductInput[] | Prisma.StockMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutProductInput | Prisma.StockMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StockMovementCreateManyProductInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput> | Prisma.StockMovementCreateWithoutProductInput[] | Prisma.StockMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutProductInput | Prisma.StockMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StockMovementCreateManyProductInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput> | Prisma.StockMovementCreateWithoutProductInput[] | Prisma.StockMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutProductInput | Prisma.StockMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StockMovementCreateManyProductInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutProductInput | Prisma.StockMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput> | Prisma.StockMovementCreateWithoutProductInput[] | Prisma.StockMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutProductInput | Prisma.StockMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StockMovementCreateManyProductInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutProductInput | Prisma.StockMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type EnumStockMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockMovementType;
};
export type StockMovementCreateWithoutCreatedByInput = {
    id?: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutStockMovementsInput;
    product: Prisma.ProductCreateNestedOneWithoutStockMovementsInput;
};
export type StockMovementUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    shopId: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type StockMovementCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput>;
};
export type StockMovementCreateManyCreatedByInputEnvelope = {
    data: Prisma.StockMovementCreateManyCreatedByInput | Prisma.StockMovementCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutCreatedByInput, Prisma.StockMovementUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutCreatedByInput, Prisma.StockMovementUncheckedCreateWithoutCreatedByInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutCreatedByInput, Prisma.StockMovementUncheckedUpdateWithoutCreatedByInput>;
};
export type StockMovementUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutCreatedByInput>;
};
export type StockMovementScalarWhereInput = {
    AND?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    OR?: Prisma.StockMovementScalarWhereInput[];
    NOT?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    id?: Prisma.StringFilter<"StockMovement"> | string;
    shopId?: Prisma.StringFilter<"StockMovement"> | string;
    productId?: Prisma.StringFilter<"StockMovement"> | string;
    type?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reason?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
};
export type StockMovementCreateWithoutShopInput = {
    id?: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStockMovementsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutStockMovementsInput;
};
export type StockMovementUncheckedCreateWithoutShopInput = {
    id?: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementCreateOrConnectWithoutShopInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput>;
};
export type StockMovementCreateManyShopInputEnvelope = {
    data: Prisma.StockMovementCreateManyShopInput | Prisma.StockMovementCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutShopInput, Prisma.StockMovementUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutShopInput, Prisma.StockMovementUncheckedCreateWithoutShopInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutShopInput, Prisma.StockMovementUncheckedUpdateWithoutShopInput>;
};
export type StockMovementUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutShopInput>;
};
export type StockMovementCreateWithoutProductInput = {
    id?: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutStockMovementsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutStockMovementsInput;
};
export type StockMovementUncheckedCreateWithoutProductInput = {
    id?: string;
    shopId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementCreateOrConnectWithoutProductInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput>;
};
export type StockMovementCreateManyProductInputEnvelope = {
    data: Prisma.StockMovementCreateManyProductInput | Prisma.StockMovementCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutProductInput, Prisma.StockMovementUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutProductInput, Prisma.StockMovementUncheckedCreateWithoutProductInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutProductInput, Prisma.StockMovementUncheckedUpdateWithoutProductInput>;
};
export type StockMovementUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutProductInput>;
};
export type StockMovementCreateManyCreatedByInput = {
    id?: string;
    shopId: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutStockMovementsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStockMovementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementCreateManyShopInput = {
    id?: string;
    productId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStockMovementsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutStockMovementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementCreateManyProductInput = {
    id?: string;
    shopId: string;
    type: $Enums.StockMovementType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    reason?: string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutStockMovementsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutStockMovementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balanceAfter?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    balanceAfter?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    reason?: boolean;
    unitCost?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    balanceAfter?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    reason?: boolean;
    unitCost?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    balanceAfter?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    reason?: boolean;
    unitCost?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectScalar = {
    id?: boolean;
    shopId?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    balanceAfter?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    reason?: boolean;
    unitCost?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
};
export type StockMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shopId" | "productId" | "type" | "quantity" | "balanceAfter" | "referenceType" | "referenceId" | "reason" | "unitCost" | "createdById" | "createdAt", ExtArgs["result"]["stockMovement"]>;
export type StockMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
};
export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
};
export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.StockMovement$createdByArgs<ExtArgs>;
};
export type $StockMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockMovement";
    objects: {
        shop: Prisma.$ShopPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shopId: string;
        productId: string;
        type: $Enums.StockMovementType;
        quantity: runtime.Decimal;
        balanceAfter: runtime.Decimal;
        referenceType: string | null;
        referenceId: string | null;
        reason: string | null;
        unitCost: runtime.Decimal | null;
        createdById: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["stockMovement"]>;
    composites: {};
};
export type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockMovementPayload, S>;
export type StockMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockMovementCountAggregateInputType | true;
};
export interface StockMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'];
        meta: {
            name: 'StockMovement';
        };
    };
    findUnique<T extends StockMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StockMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StockMovementFindManyArgs>(args?: Prisma.SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StockMovementCreateArgs>(args: Prisma.SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StockMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StockMovementDeleteArgs>(args: Prisma.SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StockMovementUpdateArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StockMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StockMovementUpsertArgs>(args: Prisma.SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StockMovementCountArgs>(args?: Prisma.Subset<T, StockMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockMovementCountAggregateOutputType> : number>;
    aggregate<T extends StockMovementAggregateArgs>(args: Prisma.Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>;
    groupBy<T extends StockMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: StockMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StockMovementFieldRefs;
}
export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shop<T extends Prisma.ShopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.StockMovement$createdByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockMovement$createdByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StockMovementFieldRefs {
    readonly id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly shopId: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly productId: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly type: Prisma.FieldRef<"StockMovement", 'StockMovementType'>;
    readonly quantity: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly balanceAfter: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly referenceType: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly referenceId: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly reason: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly unitCost: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly createdById: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly createdAt: Prisma.FieldRef<"StockMovement", 'DateTime'>;
}
export type StockMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where: Prisma.StockMovementWhereUniqueInput;
};
export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where: Prisma.StockMovementWhereUniqueInput;
};
export type StockMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
export type StockMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
export type StockMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
export type StockMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
};
export type StockMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StockMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StockMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StockMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
    where: Prisma.StockMovementWhereUniqueInput;
};
export type StockMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    where?: Prisma.StockMovementWhereInput;
    limit?: number;
};
export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    where?: Prisma.StockMovementWhereInput;
    limit?: number;
    include?: Prisma.StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StockMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
};
export type StockMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where: Prisma.StockMovementWhereUniqueInput;
};
export type StockMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
    limit?: number;
};
export type StockMovement$createdByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type StockMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
};
