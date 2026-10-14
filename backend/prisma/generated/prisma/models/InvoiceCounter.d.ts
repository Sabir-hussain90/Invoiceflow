import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InvoiceCounterModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoiceCounterPayload>;
export type AggregateInvoiceCounter = {
    _count: InvoiceCounterCountAggregateOutputType | null;
    _avg: InvoiceCounterAvgAggregateOutputType | null;
    _sum: InvoiceCounterSumAggregateOutputType | null;
    _min: InvoiceCounterMinAggregateOutputType | null;
    _max: InvoiceCounterMaxAggregateOutputType | null;
};
export type InvoiceCounterAvgAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
};
export type InvoiceCounterSumAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
};
export type InvoiceCounterMinAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    year: number | null;
    prefix: string | null;
    lastNumber: number | null;
    updatedAt: Date | null;
};
export type InvoiceCounterMaxAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    year: number | null;
    prefix: string | null;
    lastNumber: number | null;
    updatedAt: Date | null;
};
export type InvoiceCounterCountAggregateOutputType = {
    id: number;
    shopId: number;
    year: number;
    prefix: number;
    lastNumber: number;
    updatedAt: number;
    _all: number;
};
export type InvoiceCounterAvgAggregateInputType = {
    year?: true;
    lastNumber?: true;
};
export type InvoiceCounterSumAggregateInputType = {
    year?: true;
    lastNumber?: true;
};
export type InvoiceCounterMinAggregateInputType = {
    id?: true;
    shopId?: true;
    year?: true;
    prefix?: true;
    lastNumber?: true;
    updatedAt?: true;
};
export type InvoiceCounterMaxAggregateInputType = {
    id?: true;
    shopId?: true;
    year?: true;
    prefix?: true;
    lastNumber?: true;
    updatedAt?: true;
};
export type InvoiceCounterCountAggregateInputType = {
    id?: true;
    shopId?: true;
    year?: true;
    prefix?: true;
    lastNumber?: true;
    updatedAt?: true;
    _all?: true;
};
export type InvoiceCounterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceCounterWhereInput;
    orderBy?: Prisma.InvoiceCounterOrderByWithRelationInput | Prisma.InvoiceCounterOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceCounterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceCounterCountAggregateInputType;
    _avg?: InvoiceCounterAvgAggregateInputType;
    _sum?: InvoiceCounterSumAggregateInputType;
    _min?: InvoiceCounterMinAggregateInputType;
    _max?: InvoiceCounterMaxAggregateInputType;
};
export type GetInvoiceCounterAggregateType<T extends InvoiceCounterAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoiceCounter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoiceCounter[P]> : Prisma.GetScalarType<T[P], AggregateInvoiceCounter[P]>;
};
export type InvoiceCounterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceCounterWhereInput;
    orderBy?: Prisma.InvoiceCounterOrderByWithAggregationInput | Prisma.InvoiceCounterOrderByWithAggregationInput[];
    by: Prisma.InvoiceCounterScalarFieldEnum[] | Prisma.InvoiceCounterScalarFieldEnum;
    having?: Prisma.InvoiceCounterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceCounterCountAggregateInputType | true;
    _avg?: InvoiceCounterAvgAggregateInputType;
    _sum?: InvoiceCounterSumAggregateInputType;
    _min?: InvoiceCounterMinAggregateInputType;
    _max?: InvoiceCounterMaxAggregateInputType;
};
export type InvoiceCounterGroupByOutputType = {
    id: string;
    shopId: string;
    year: number;
    prefix: string;
    lastNumber: number;
    updatedAt: Date;
    _count: InvoiceCounterCountAggregateOutputType | null;
    _avg: InvoiceCounterAvgAggregateOutputType | null;
    _sum: InvoiceCounterSumAggregateOutputType | null;
    _min: InvoiceCounterMinAggregateOutputType | null;
    _max: InvoiceCounterMaxAggregateOutputType | null;
};
export type GetInvoiceCounterGroupByPayload<T extends InvoiceCounterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceCounterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceCounterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceCounterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceCounterGroupByOutputType[P]>;
}>>;
export type InvoiceCounterWhereInput = {
    AND?: Prisma.InvoiceCounterWhereInput | Prisma.InvoiceCounterWhereInput[];
    OR?: Prisma.InvoiceCounterWhereInput[];
    NOT?: Prisma.InvoiceCounterWhereInput | Prisma.InvoiceCounterWhereInput[];
    id?: Prisma.StringFilter<"InvoiceCounter"> | string;
    shopId?: Prisma.StringFilter<"InvoiceCounter"> | string;
    year?: Prisma.IntFilter<"InvoiceCounter"> | number;
    prefix?: Prisma.StringFilter<"InvoiceCounter"> | string;
    lastNumber?: Prisma.IntFilter<"InvoiceCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"InvoiceCounter"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
};
export type InvoiceCounterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    prefix?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    shop?: Prisma.ShopOrderByWithRelationInput;
};
export type InvoiceCounterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    shopId_year_prefix?: Prisma.InvoiceCounterShopIdYearPrefixCompoundUniqueInput;
    AND?: Prisma.InvoiceCounterWhereInput | Prisma.InvoiceCounterWhereInput[];
    OR?: Prisma.InvoiceCounterWhereInput[];
    NOT?: Prisma.InvoiceCounterWhereInput | Prisma.InvoiceCounterWhereInput[];
    shopId?: Prisma.StringFilter<"InvoiceCounter"> | string;
    year?: Prisma.IntFilter<"InvoiceCounter"> | number;
    prefix?: Prisma.StringFilter<"InvoiceCounter"> | string;
    lastNumber?: Prisma.IntFilter<"InvoiceCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"InvoiceCounter"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
}, "id" | "shopId_year_prefix">;
export type InvoiceCounterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    prefix?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InvoiceCounterCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceCounterAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceCounterMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceCounterMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceCounterSumOrderByAggregateInput;
};
export type InvoiceCounterScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceCounterScalarWhereWithAggregatesInput | Prisma.InvoiceCounterScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceCounterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceCounterScalarWhereWithAggregatesInput | Prisma.InvoiceCounterScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InvoiceCounter"> | string;
    shopId?: Prisma.StringWithAggregatesFilter<"InvoiceCounter"> | string;
    year?: Prisma.IntWithAggregatesFilter<"InvoiceCounter"> | number;
    prefix?: Prisma.StringWithAggregatesFilter<"InvoiceCounter"> | string;
    lastNumber?: Prisma.IntWithAggregatesFilter<"InvoiceCounter"> | number;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"InvoiceCounter"> | Date | string;
};
export type InvoiceCounterCreateInput = {
    id?: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutInvoiceCountersInput;
};
export type InvoiceCounterUncheckedCreateInput = {
    id?: string;
    shopId: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type InvoiceCounterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutInvoiceCountersNestedInput;
};
export type InvoiceCounterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterCreateManyInput = {
    id?: string;
    shopId: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type InvoiceCounterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterListRelationFilter = {
    every?: Prisma.InvoiceCounterWhereInput;
    some?: Prisma.InvoiceCounterWhereInput;
    none?: Prisma.InvoiceCounterWhereInput;
};
export type InvoiceCounterOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvoiceCounterShopIdYearPrefixCompoundUniqueInput = {
    shopId: string;
    year: number;
    prefix: string;
};
export type InvoiceCounterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    prefix?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceCounterAvgOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
};
export type InvoiceCounterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    prefix?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceCounterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    prefix?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceCounterSumOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
};
export type InvoiceCounterCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput> | Prisma.InvoiceCounterCreateWithoutShopInput[] | Prisma.InvoiceCounterUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCounterCreateOrConnectWithoutShopInput | Prisma.InvoiceCounterCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.InvoiceCounterCreateManyShopInputEnvelope;
    connect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
};
export type InvoiceCounterUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput> | Prisma.InvoiceCounterCreateWithoutShopInput[] | Prisma.InvoiceCounterUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCounterCreateOrConnectWithoutShopInput | Prisma.InvoiceCounterCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.InvoiceCounterCreateManyShopInputEnvelope;
    connect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
};
export type InvoiceCounterUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput> | Prisma.InvoiceCounterCreateWithoutShopInput[] | Prisma.InvoiceCounterUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCounterCreateOrConnectWithoutShopInput | Prisma.InvoiceCounterCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.InvoiceCounterUpsertWithWhereUniqueWithoutShopInput | Prisma.InvoiceCounterUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.InvoiceCounterCreateManyShopInputEnvelope;
    set?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    disconnect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    delete?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    connect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    update?: Prisma.InvoiceCounterUpdateWithWhereUniqueWithoutShopInput | Prisma.InvoiceCounterUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.InvoiceCounterUpdateManyWithWhereWithoutShopInput | Prisma.InvoiceCounterUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.InvoiceCounterScalarWhereInput | Prisma.InvoiceCounterScalarWhereInput[];
};
export type InvoiceCounterUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput> | Prisma.InvoiceCounterCreateWithoutShopInput[] | Prisma.InvoiceCounterUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.InvoiceCounterCreateOrConnectWithoutShopInput | Prisma.InvoiceCounterCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.InvoiceCounterUpsertWithWhereUniqueWithoutShopInput | Prisma.InvoiceCounterUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.InvoiceCounterCreateManyShopInputEnvelope;
    set?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    disconnect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    delete?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    connect?: Prisma.InvoiceCounterWhereUniqueInput | Prisma.InvoiceCounterWhereUniqueInput[];
    update?: Prisma.InvoiceCounterUpdateWithWhereUniqueWithoutShopInput | Prisma.InvoiceCounterUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.InvoiceCounterUpdateManyWithWhereWithoutShopInput | Prisma.InvoiceCounterUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.InvoiceCounterScalarWhereInput | Prisma.InvoiceCounterScalarWhereInput[];
};
export type InvoiceCounterCreateWithoutShopInput = {
    id?: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type InvoiceCounterUncheckedCreateWithoutShopInput = {
    id?: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type InvoiceCounterCreateOrConnectWithoutShopInput = {
    where: Prisma.InvoiceCounterWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput>;
};
export type InvoiceCounterCreateManyShopInputEnvelope = {
    data: Prisma.InvoiceCounterCreateManyShopInput | Prisma.InvoiceCounterCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCounterUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.InvoiceCounterWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceCounterUpdateWithoutShopInput, Prisma.InvoiceCounterUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.InvoiceCounterCreateWithoutShopInput, Prisma.InvoiceCounterUncheckedCreateWithoutShopInput>;
};
export type InvoiceCounterUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.InvoiceCounterWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceCounterUpdateWithoutShopInput, Prisma.InvoiceCounterUncheckedUpdateWithoutShopInput>;
};
export type InvoiceCounterUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.InvoiceCounterScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceCounterUpdateManyMutationInput, Prisma.InvoiceCounterUncheckedUpdateManyWithoutShopInput>;
};
export type InvoiceCounterScalarWhereInput = {
    AND?: Prisma.InvoiceCounterScalarWhereInput | Prisma.InvoiceCounterScalarWhereInput[];
    OR?: Prisma.InvoiceCounterScalarWhereInput[];
    NOT?: Prisma.InvoiceCounterScalarWhereInput | Prisma.InvoiceCounterScalarWhereInput[];
    id?: Prisma.StringFilter<"InvoiceCounter"> | string;
    shopId?: Prisma.StringFilter<"InvoiceCounter"> | string;
    year?: Prisma.IntFilter<"InvoiceCounter"> | number;
    prefix?: Prisma.StringFilter<"InvoiceCounter"> | string;
    lastNumber?: Prisma.IntFilter<"InvoiceCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"InvoiceCounter"> | Date | string;
};
export type InvoiceCounterCreateManyShopInput = {
    id?: string;
    year: number;
    prefix?: string;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type InvoiceCounterUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCounterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    year?: boolean;
    prefix?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceCounter"]>;
export type InvoiceCounterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    year?: boolean;
    prefix?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceCounter"]>;
export type InvoiceCounterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    year?: boolean;
    prefix?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceCounter"]>;
export type InvoiceCounterSelectScalar = {
    id?: boolean;
    shopId?: boolean;
    year?: boolean;
    prefix?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
};
export type InvoiceCounterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shopId" | "year" | "prefix" | "lastNumber" | "updatedAt", ExtArgs["result"]["invoiceCounter"]>;
export type InvoiceCounterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type InvoiceCounterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type InvoiceCounterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type $InvoiceCounterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InvoiceCounter";
    objects: {
        shop: Prisma.$ShopPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shopId: string;
        year: number;
        prefix: string;
        lastNumber: number;
        updatedAt: Date;
    }, ExtArgs["result"]["invoiceCounter"]>;
    composites: {};
};
export type InvoiceCounterGetPayload<S extends boolean | null | undefined | InvoiceCounterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload, S>;
export type InvoiceCounterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceCounterCountAggregateInputType | true;
};
export interface InvoiceCounterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InvoiceCounter'];
        meta: {
            name: 'InvoiceCounter';
        };
    };
    findUnique<T extends InvoiceCounterFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceCounterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceCounterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceCounterFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceCounterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceCounterFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceCounterCreateArgs>(args: Prisma.SelectSubset<T, InvoiceCounterCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceCounterCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceCounterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceCounterDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceCounterDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceCounterUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceCounterUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceCounterDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceCounterUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceCounterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceCounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceCounterUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceCounterUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceCounterClient<runtime.Types.Result.GetResult<Prisma.$InvoiceCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceCounterCountArgs>(args?: Prisma.Subset<T, InvoiceCounterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceCounterCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceCounterAggregateArgs>(args: Prisma.Subset<T, InvoiceCounterAggregateArgs>): Prisma.PrismaPromise<GetInvoiceCounterAggregateType<T>>;
    groupBy<T extends InvoiceCounterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceCounterGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceCounterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceCounterFieldRefs;
}
export interface Prisma__InvoiceCounterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shop<T extends Prisma.ShopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceCounterFieldRefs {
    readonly id: Prisma.FieldRef<"InvoiceCounter", 'String'>;
    readonly shopId: Prisma.FieldRef<"InvoiceCounter", 'String'>;
    readonly year: Prisma.FieldRef<"InvoiceCounter", 'Int'>;
    readonly prefix: Prisma.FieldRef<"InvoiceCounter", 'String'>;
    readonly lastNumber: Prisma.FieldRef<"InvoiceCounter", 'Int'>;
    readonly updatedAt: Prisma.FieldRef<"InvoiceCounter", 'DateTime'>;
}
export type InvoiceCounterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where: Prisma.InvoiceCounterWhereUniqueInput;
};
export type InvoiceCounterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where: Prisma.InvoiceCounterWhereUniqueInput;
};
export type InvoiceCounterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where?: Prisma.InvoiceCounterWhereInput;
    orderBy?: Prisma.InvoiceCounterOrderByWithRelationInput | Prisma.InvoiceCounterOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceCounterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceCounterScalarFieldEnum | Prisma.InvoiceCounterScalarFieldEnum[];
};
export type InvoiceCounterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where?: Prisma.InvoiceCounterWhereInput;
    orderBy?: Prisma.InvoiceCounterOrderByWithRelationInput | Prisma.InvoiceCounterOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceCounterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceCounterScalarFieldEnum | Prisma.InvoiceCounterScalarFieldEnum[];
};
export type InvoiceCounterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where?: Prisma.InvoiceCounterWhereInput;
    orderBy?: Prisma.InvoiceCounterOrderByWithRelationInput | Prisma.InvoiceCounterOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceCounterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceCounterScalarFieldEnum | Prisma.InvoiceCounterScalarFieldEnum[];
};
export type InvoiceCounterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCounterCreateInput, Prisma.InvoiceCounterUncheckedCreateInput>;
};
export type InvoiceCounterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceCounterCreateManyInput | Prisma.InvoiceCounterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCounterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    data: Prisma.InvoiceCounterCreateManyInput | Prisma.InvoiceCounterCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvoiceCounterIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvoiceCounterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCounterUpdateInput, Prisma.InvoiceCounterUncheckedUpdateInput>;
    where: Prisma.InvoiceCounterWhereUniqueInput;
};
export type InvoiceCounterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceCounterUpdateManyMutationInput, Prisma.InvoiceCounterUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceCounterWhereInput;
    limit?: number;
};
export type InvoiceCounterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCounterUpdateManyMutationInput, Prisma.InvoiceCounterUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceCounterWhereInput;
    limit?: number;
    include?: Prisma.InvoiceCounterIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvoiceCounterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where: Prisma.InvoiceCounterWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCounterCreateInput, Prisma.InvoiceCounterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceCounterUpdateInput, Prisma.InvoiceCounterUncheckedUpdateInput>;
};
export type InvoiceCounterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
    where: Prisma.InvoiceCounterWhereUniqueInput;
};
export type InvoiceCounterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceCounterWhereInput;
    limit?: number;
};
export type InvoiceCounterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCounterSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceCounterOmit<ExtArgs> | null;
    include?: Prisma.InvoiceCounterInclude<ExtArgs> | null;
};
