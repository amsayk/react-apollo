// Generated by typings
// Source: node_modules/apollo-client/middleware.d.ts
declare module '~apollo-client/middleware' {
import { Request } from '~apollo-client/networkInterface';
export interface MiddlewareRequest {
    request: Request;
    options: RequestInit;
}
export interface MiddlewareInterface {
    applyMiddleware(request: MiddlewareRequest, next: Function): any;
}
}
declare module 'apollo-client/middleware' {
export * from '~apollo-client/middleware';
}

// Generated by typings
// Source: node_modules/apollo-client/afterware.d.ts
declare module '~apollo-client/afterware' {
export interface AfterwareResponse {
    response: IResponse;
    options: RequestInit;
}
export interface AfterwareInterface {
    applyAfterware(response: AfterwareResponse, next: Function): any;
}
}
declare module 'apollo-client/afterware' {
export * from '~apollo-client/afterware';
}

// Generated by typings
// Source: node_modules/apollo-client/networkInterface.d.ts
declare module '~apollo-client/networkInterface' {
import 'whatwg-fetch';
import { GraphQLResult, Document } from 'graphql';
import { MiddlewareInterface } from '~apollo-client/middleware';
import { AfterwareInterface } from '~apollo-client/afterware';
export interface Request {
    debugName?: string;
    query?: Document;
    variables?: Object;
    operationName?: string;
}
export interface PrintedRequest {
    debugName?: string;
    query?: string;
    variables?: Object;
    operationName?: string;
}
export interface NetworkInterface {
    [others: string]: any;
    query(request: Request): Promise<GraphQLResult>;
}
export interface SubscriptionNetworkInterface extends NetworkInterface {
    subscribe(request: Request, handler: (error, result) => void): number;
    unsubscribe(id: Number): void;
}
export interface BatchedNetworkInterface extends NetworkInterface {
    batchQuery(requests: Request[]): Promise<GraphQLResult[]>;
}
export interface HTTPNetworkInterface extends BatchedNetworkInterface {
    _uri: string;
    _opts: RequestInit;
    _middlewares: MiddlewareInterface[];
    _afterwares: AfterwareInterface[];
    use(middlewares: MiddlewareInterface[]): any;
    useAfter(afterwares: AfterwareInterface[]): any;
}
export interface RequestAndOptions {
    request: Request;
    options: RequestInit;
}
export interface ResponseAndOptions {
    response: IResponse;
    options: RequestInit;
}
export function addQueryMerging(networkInterface: NetworkInterface): BatchedNetworkInterface;
export function printRequest(request: Request): PrintedRequest;
export function createNetworkInterface(uri: string, opts?: RequestInit): HTTPNetworkInterface;
}
declare module 'apollo-client/networkInterface' {
export * from '~apollo-client/networkInterface';
}

// Generated by typings
// Source: node_modules/apollo-client/data/store.d.ts
declare module '~apollo-client/data/store' {
import { ApolloAction } from '~apollo-client/actions';
import { QueryStore } from '~apollo-client/queries/store';
import { MutationStore } from '~apollo-client/mutations/store';
import { ApolloReducerConfig } from '~apollo-client/store';
export interface NormalizedCache {
    [dataId: string]: StoreObject;
}
export interface StoreObject {
    __typename?: string;
    [storeFieldKey: string]: StoreValue;
}
export interface IdValue {
    type: "id";
    id: string;
    generated: boolean;
}
export interface JsonValue {
    type: "json";
    json: any;
}
export type StoreValue = number | string | string[] | IdValue | JsonValue;
export function isIdValue(idObject: StoreValue): idObject is IdValue;
export function isJsonValue(jsonObject: StoreValue): jsonObject is JsonValue;
export function data(previousState: NormalizedCache, action: ApolloAction, queries: QueryStore, mutations: MutationStore, config: ApolloReducerConfig): NormalizedCache;
}
declare module 'apollo-client/data/store' {
export * from '~apollo-client/data/store';
}

// Generated by typings
// Source: node_modules/apollo-client/queries/store.d.ts
declare module '~apollo-client/queries/store' {
import { ApolloAction } from '~apollo-client/actions';
import { FragmentMap } from '~apollo-client/queries/getFromAST';
import { SelectionSet, GraphQLError } from 'graphql';
export interface QueryStore {
    [queryId: string]: QueryStoreValue;
}
export interface QueryStoreValue {
    queryString: string;
    query: SelectionSetWithRoot;
    minimizedQueryString: string;
    minimizedQuery: SelectionSetWithRoot;
    variables: Object;
    loading: boolean;
    networkError: Error;
    graphQLErrors: GraphQLError[];
    forceFetch: boolean;
    returnPartialData: boolean;
    lastRequestId: number;
    fragmentMap: FragmentMap;
}
export interface SelectionSetWithRoot {
    id: string;
    typeName: string;
    selectionSet: SelectionSet;
}
export function queries(previousState: QueryStore, action: ApolloAction): QueryStore;
}
declare module 'apollo-client/queries/store' {
export * from '~apollo-client/queries/store';
}

// Generated by typings
// Source: node_modules/apollo-client/mutations/store.d.ts
declare module '~apollo-client/mutations/store' {
import { ApolloAction } from '~apollo-client/actions';
import { SelectionSet } from 'graphql';
import { FragmentMap } from '~apollo-client/queries/getFromAST';
export interface MutationStore {
    [mutationId: string]: MutationStoreValue;
}
export interface MutationStoreValue {
    mutationString: string;
    mutation: SelectionSetWithRoot;
    variables: Object;
    loading: boolean;
    error: Error;
    fragmentMap: FragmentMap;
}
export interface SelectionSetWithRoot {
    id: string;
    typeName: string;
    selectionSet: SelectionSet;
}
export function mutations(previousState: MutationStore, action: ApolloAction): MutationStore;
}
declare module 'apollo-client/mutations/store' {
export * from '~apollo-client/mutations/store';
}

// Generated by typings
// Source: node_modules/apollo-client/optimistic-data/store.d.ts
declare module '~apollo-client/optimistic-data/store' {
import { NormalizedCache } from '~apollo-client/data/store';
export type OptimisticStore = {
    mutationId: string;
    data: NormalizedCache;
}[];
export function optimistic(previousState: any[], action: any, store: any, config: any): OptimisticStore;
}
declare module 'apollo-client/optimistic-data/store' {
export * from '~apollo-client/optimistic-data/store';
}

// Generated by typings
// Source: node_modules/apollo-client/actions.d.ts
declare module '~apollo-client/actions' {
import { GraphQLResult, SelectionSet, FragmentDefinition } from 'graphql';
import { SelectionSetWithRoot } from '~apollo-client/queries/store';
import { MutationBehavior } from '~apollo-client/data/mutationResults';
import { FragmentMap } from '~apollo-client/queries/getFromAST';
export interface QueryResultAction {
    type: 'APOLLO_QUERY_RESULT';
    result: GraphQLResult;
    queryId: string;
    requestId: number;
}
export function isQueryResultAction(action: ApolloAction): action is QueryResultAction;
export interface QueryErrorAction {
    type: 'APOLLO_QUERY_ERROR';
    error: Error;
    queryId: string;
    requestId: number;
}
export function isQueryErrorAction(action: ApolloAction): action is QueryErrorAction;
export interface QueryInitAction {
    type: 'APOLLO_QUERY_INIT';
    queryString: string;
    query: SelectionSetWithRoot;
    minimizedQueryString: string;
    minimizedQuery: SelectionSetWithRoot;
    variables: Object;
    forceFetch: boolean;
    returnPartialData: boolean;
    queryId: string;
    requestId: number;
    fragmentMap: FragmentMap;
}
export function isQueryInitAction(action: ApolloAction): action is QueryInitAction;
export interface QueryResultClientAction {
    type: 'APOLLO_QUERY_RESULT_CLIENT';
    result: GraphQLResult;
    complete: boolean;
    queryId: string;
}
export function isQueryResultClientAction(action: ApolloAction): action is QueryResultClientAction;
export interface QueryStopAction {
    type: 'APOLLO_QUERY_STOP';
    queryId: string;
}
export function isQueryStopAction(action: ApolloAction): action is QueryStopAction;
export interface MutationInitAction {
    type: 'APOLLO_MUTATION_INIT';
    mutationString: string;
    mutation: SelectionSetWithRoot;
    variables: Object;
    mutationId: string;
    fragmentMap: FragmentMap;
    optimisticResponse: Object;
    resultBehaviors?: MutationBehavior[];
}
export function isMutationInitAction(action: ApolloAction): action is MutationInitAction;
export interface MutationResultAction {
    type: 'APOLLO_MUTATION_RESULT';
    result: GraphQLResult;
    mutationId: string;
    resultBehaviors?: MutationBehavior[];
}
export function isMutationResultAction(action: ApolloAction): action is MutationResultAction;
export interface MutationErrorAction {
    type: 'APOLLO_MUTATION_ERROR';
    error: Error;
    mutationId: string;
}
export function isMutationErrorAction(action: ApolloAction): action is MutationErrorAction;
export interface UpdateQueryResultAction {
    type: 'APOLLO_UPDATE_QUERY_RESULT';
    queryVariables: any;
    querySelectionSet: SelectionSet;
    queryFragments: FragmentDefinition[];
    newResult: Object;
}
export function isUpdateQueryResultAction(action: ApolloAction): action is UpdateQueryResultAction;
export interface StoreResetAction {
    type: 'APOLLO_STORE_RESET';
    observableQueryIds: string[];
}
export function isStoreResetAction(action: ApolloAction): action is StoreResetAction;
export type ApolloAction = QueryResultAction | QueryErrorAction | QueryInitAction | QueryResultClientAction | QueryStopAction | MutationInitAction | MutationResultAction | MutationErrorAction | UpdateQueryResultAction | StoreResetAction;
}
declare module 'apollo-client/actions' {
export * from '~apollo-client/actions';
}

// Generated by typings
// Source: node_modules/apollo-client/store.d.ts
declare module '~apollo-client/store' {
import { NormalizedCache } from '~apollo-client/data/store';
import { QueryStore } from '~apollo-client/queries/store';
import { MutationStore } from '~apollo-client/mutations/store';
import { OptimisticStore } from '~apollo-client/optimistic-data/store';
import { ApolloAction } from '~apollo-client/actions';
import { IdGetter } from '~apollo-client/data/extensions';
import { MutationBehaviorReducerMap } from '~apollo-client/data/mutationResults';
export interface Store {
    data: NormalizedCache;
    queries: QueryStore;
    mutations: MutationStore;
    optimistic: OptimisticStore;
}
export interface ApolloStore {
    dispatch: (action: ApolloAction) => void;
    getState: () => any;
}
export function createApolloReducer(config: ApolloReducerConfig): Function;
export function createApolloStore({reduxRootKey, initialState, config, reportCrashes}?: {
    reduxRootKey?: string;
    initialState?: any;
    config?: ApolloReducerConfig;
    reportCrashes?: boolean;
}): ApolloStore;
export interface ApolloReducerConfig {
    dataIdFromObject?: IdGetter;
    mutationBehaviorReducers?: MutationBehaviorReducerMap;
}
export function getDataWithOptimisticResults(store: Store): NormalizedCache;
}
declare module 'apollo-client/store' {
export * from '~apollo-client/store';
}

// Generated by typings
// Source: node_modules/apollo-client/scheduler.d.ts
declare module '~apollo-client/scheduler' {
import { QueryManager, QueryListener } from '~apollo-client/QueryManager';
import { ObservableQuery } from '~apollo-client/ObservableQuery';
import { WatchQueryOptions } from '~apollo-client/watchQueryOptions';
export class QueryScheduler {
    inFlightQueries: {
        [queryId: string]: WatchQueryOptions;
    };
    registeredQueries: {
        [queryId: string]: WatchQueryOptions;
    };
    intervalQueries: {
        [interval: number]: string[];
    };
    queryManager: QueryManager;
    private pollingTimers;
    constructor({queryManager}: {
        queryManager: QueryManager;
    });
    checkInFlight(queryId: string): boolean;
    fetchQuery(queryId: string, options: WatchQueryOptions): Promise<{}>;
    startPollingQuery(options: WatchQueryOptions, queryId?: string, firstFetch?: boolean, listener?: QueryListener): string;
    stopPollingQuery(queryId: string): void;
    fetchQueriesOnInterval(interval: number): void;
    addQueryOnInterval(queryId: string, queryOptions: WatchQueryOptions): void;
    registerPollingQuery(queryOptions: WatchQueryOptions): ObservableQuery;
    private addInFlight(queryId, options);
    private removeInFlight(queryId);
}
}
declare module 'apollo-client/scheduler' {
export * from '~apollo-client/scheduler';
}

// Generated by typings
// Source: node_modules/apollo-client/util/Observable.d.ts
declare module '~apollo-client/util/Observable' {
export type CleanupFunction = () => void;
export type SubscriberFunction<T> = (observer: Observer<T>) => (Subscription | CleanupFunction);
export class Observable<T> {
    private subscriberFunction;
    constructor(subscriberFunction: SubscriberFunction<T>);
    subscribe(observer: Observer<T>): Subscription;
}
export interface Observer<T> {
    next?: (value: T) => void;
    error?: (error: Error) => void;
    complete?: () => void;
}
export interface Subscription {
    unsubscribe: CleanupFunction;
}
}
declare module 'apollo-client/util/Observable' {
export * from '~apollo-client/util/Observable';
}

// Generated by typings
// Source: node_modules/apollo-client/QueryManager.d.ts
declare module '~apollo-client/QueryManager' {
import { NetworkInterface } from '~apollo-client/networkInterface';
import { ApolloStore, Store } from '~apollo-client/store';
import { QueryStoreValue } from '~apollo-client/queries/store';
import { QueryTransformer } from '~apollo-client/queries/queryTransform';
import { NormalizedCache } from '~apollo-client/data/store';
import { Document, FragmentDefinition, SelectionSet } from 'graphql';
import { MutationBehavior, MutationQueryReducersMap } from '~apollo-client/data/mutationResults';
import { QueryScheduler } from '~apollo-client/scheduler';
import { ApolloQueryResult } from '~apollo-client/index';
import { Observer, Subscription } from '~apollo-client/util/Observable';
import { WatchQueryOptions } from '~apollo-client/watchQueryOptions';
import { ObservableQuery } from '~apollo-client/ObservableQuery';
export type QueryListener = (queryStoreValue: QueryStoreValue) => void;
export interface SubscriptionOptions {
    query: Document;
    variables?: {
        [key: string]: any;
    };
    fragments?: FragmentDefinition[];
    handler: (error: Object, result: Object) => void;
}
export class QueryManager {
    pollingTimers: {
        [queryId: string]: NodeJS.Timer | any;
    };
    scheduler: QueryScheduler;
    store: ApolloStore;
    private networkInterface;
    private reduxRootKey;
    private queryTransformer;
    private queryListeners;
    private queryResults;
    private idCounter;
    private batcher;
    private batchInterval;
    private fetchQueryPromises;
    private observableQueries;
    private queryIdsByName;
    constructor({networkInterface, store, reduxRootKey, queryTransformer, shouldBatch, batchInterval}: {
        networkInterface: NetworkInterface;
        store: ApolloStore;
        reduxRootKey: string;
        queryTransformer?: QueryTransformer;
        shouldBatch?: Boolean;
        batchInterval?: number;
    });
    broadcastNewStore(store: any): void;
    mutate({mutation, variables, resultBehaviors, fragments, optimisticResponse, updateQueries, refetchQueries}: {
        mutation: Document;
        variables?: Object;
        resultBehaviors?: MutationBehavior[];
        fragments?: FragmentDefinition[];
        optimisticResponse?: Object;
        updateQueries?: MutationQueryReducersMap;
        refetchQueries?: string[];
    }): Promise<ApolloQueryResult>;
    queryListenerForObserver(queryId: string, options: WatchQueryOptions, observer: Observer<ApolloQueryResult>): QueryListener;
    watchQuery(options: WatchQueryOptions, shouldSubscribe?: boolean): ObservableQuery;
    query(options: WatchQueryOptions): Promise<ApolloQueryResult>;
    fetchQuery(queryId: string, options: WatchQueryOptions): Promise<ApolloQueryResult>;
    generateQueryId(): string;
    stopQueryInStore(queryId: string): void;
    getApolloState(): Store;
    getDataWithOptimisticResults(): NormalizedCache;
    addQueryListener(queryId: string, listener: QueryListener): void;
    removeQueryListener(queryId: string): void;
    addFetchQueryPromise(requestId: number, promise: Promise<ApolloQueryResult>, resolve: (result: ApolloQueryResult) => void, reject: (error: Error) => void): void;
    removeFetchQueryPromise(requestId: number): void;
    addObservableQuery(queryId: string, observableQuery: ObservableQuery): void;
    addQuerySubscription(queryId: string, querySubscription: Subscription): void;
    removeObservableQuery(queryId: string): void;
    resetStore(): void;
    startQuery(queryId: string, options: WatchQueryOptions, listener: QueryListener): string;
    startSubscription(options: SubscriptionOptions): number;
    stopQuery(queryId: string): void;
    getQueryWithPreviousResult(queryId: string, isOptimistic?: boolean): {
        previousResult: Object;
        queryVariables: {
            [key: string]: any;
        };
        querySelectionSet: SelectionSet;
        queryFragments: FragmentDefinition[];
    };
    private collectResultBehaviorsFromUpdateQueries(updateQueries, mutationResult, isOptimistic?);
    private transformQueryDocument(options);
    private handleDiffQuery({queryDef, rootId, variables, fragmentMap, noFetch});
    private fetchRequest({requestId, queryId, query, querySS, options, fragmentMap, networkInterface});
    private fetchQueryOverInterface(queryId, options, networkInterface);
    private refetchQueryByName(queryName);
    private isDifferentResult(queryId, result);
    private broadcastQueries();
    private generateRequestId();
}
}
declare module 'apollo-client/QueryManager' {
export * from '~apollo-client/QueryManager';
}

// Generated by typings
// Source: node_modules/apollo-client/ObservableQuery.d.ts
declare module '~apollo-client/ObservableQuery' {
import { WatchQueryOptions, FetchMoreQueryOptions, GraphQLSubscriptionOptions } from '~apollo-client/watchQueryOptions';
import { Observable } from '~apollo-client/util/Observable';
import { QueryScheduler } from '~apollo-client/scheduler';
import { ApolloQueryResult } from '~apollo-client/index';
export interface FetchMoreOptions {
    updateQuery: (previousQueryResult: Object, options: {
        fetchMoreResult: Object;
        queryVariables: Object;
    }) => Object;
}
export interface UpdateQueryOptions {
    queryVariables: Object;
}
export class ObservableQuery extends Observable<ApolloQueryResult> {
    refetch: (variables?: any) => Promise<ApolloQueryResult>;
    fetchMore: (options: FetchMoreQueryOptions & FetchMoreOptions) => Promise<any>;
    startGraphQLSubscription: (options: GraphQLSubscriptionOptions) => number;
    updateQuery: (mapFn: (previousQueryResult: any, options: UpdateQueryOptions) => any) => void;
    stopPolling: () => void;
    startPolling: (p: number) => void;
    options: WatchQueryOptions;
    queryId: string;
    private scheduler;
    private queryManager;
    constructor({scheduler, options, shouldSubscribe}: {
        scheduler: QueryScheduler;
        options: WatchQueryOptions;
        shouldSubscribe?: boolean;
    });
    result(): Promise<ApolloQueryResult>;
}
}
declare module 'apollo-client/ObservableQuery' {
export * from '~apollo-client/ObservableQuery';
}

// Generated by typings
// Source: node_modules/apollo-client/watchQueryOptions.d.ts
declare module '~apollo-client/watchQueryOptions' {
import { Document, FragmentDefinition } from 'graphql';
export interface WatchQueryOptions {
    query: Document;
    variables?: {
        [key: string]: any;
    };
    forceFetch?: boolean;
    returnPartialData?: boolean;
    noFetch?: boolean;
    pollInterval?: number;
    fragments?: FragmentDefinition[];
}
export interface FetchMoreQueryOptions {
    query?: Document;
    variables?: {
        [key: string]: any;
    };
}
export interface GraphQLSubscriptionOptions {
    subscription: Document;
    variables?: {
        [key: string]: any;
    };
    fragments?: FragmentDefinition[];
    updateQuery: (previousQueryResult: Object, options: {
        subscriptionResult: Object;
        queryVariables: Object;
    }) => Object;
}
}
declare module 'apollo-client/watchQueryOptions' {
export * from '~apollo-client/watchQueryOptions';
}

// Generated by typings
// Source: node_modules/apollo-client/queries/getFromAST.d.ts
declare module '~apollo-client/queries/getFromAST' {
import { Document, OperationDefinition, FragmentDefinition } from 'graphql';
export function getMutationDefinition(doc: Document): OperationDefinition;
export function checkDocument(doc: Document): void;
export function getOperationName(doc: Document): string;
export function getFragmentDefinitions(doc: Document): FragmentDefinition[];
export function getQueryDefinition(doc: Document): OperationDefinition;
export function getFragmentDefinition(doc: Document): FragmentDefinition;
export interface FragmentMap {
    [fragmentName: string]: FragmentDefinition;
}
export function createFragmentMap(fragments?: FragmentDefinition[]): FragmentMap;
export function addFragmentsToDocument(queryDoc: Document, fragments: FragmentDefinition[]): Document;
}
declare module 'apollo-client/queries/getFromAST' {
export * from '~apollo-client/queries/getFromAST';
}

// Generated by typings
// Source: node_modules/apollo-client/data/readFromStore.d.ts
declare module '~apollo-client/data/readFromStore' {
import { SelectionSet, Document } from 'graphql';
import { FragmentMap } from '~apollo-client/queries/getFromAST';
import { NormalizedCache } from '~apollo-client/data/store';
export function readQueryFromStore({store, query, variables, returnPartialData, fragmentMap}: {
    store: NormalizedCache;
    query: Document;
    variables?: Object;
    returnPartialData?: boolean;
    fragmentMap?: FragmentMap;
}): Object;
export function readFragmentFromStore({store, fragment, rootId, variables, returnPartialData}: {
    store: NormalizedCache;
    fragment: Document;
    rootId: string;
    variables?: Object;
    returnPartialData?: boolean;
}): Object;
export function readSelectionSetFromStore({store, rootId, selectionSet, variables, returnPartialData, fragmentMap}: {
    store: NormalizedCache;
    rootId: string;
    selectionSet: SelectionSet;
    variables: Object;
    returnPartialData?: boolean;
    fragmentMap?: FragmentMap;
}): Object;
}
declare module 'apollo-client/data/readFromStore' {
export * from '~apollo-client/data/readFromStore';
}

// Generated by typings
// Source: node_modules/apollo-client/data/writeToStore.d.ts
declare module '~apollo-client/data/writeToStore' {
import { FragmentMap } from '~apollo-client/queries/getFromAST';
import { SelectionSet, Document } from 'graphql';
import { NormalizedCache } from '~apollo-client/data/store';
import { IdGetter } from '~apollo-client/data/extensions';
export function writeFragmentToStore({result, fragment, store, variables, dataIdFromObject}: {
    result: Object;
    fragment: Document;
    store?: NormalizedCache;
    variables?: Object;
    dataIdFromObject?: IdGetter;
}): NormalizedCache;
export function writeQueryToStore({result, query, store, variables, dataIdFromObject, fragmentMap}: {
    result: Object;
    query: Document;
    store?: NormalizedCache;
    variables?: Object;
    dataIdFromObject?: IdGetter;
    fragmentMap?: FragmentMap;
}): NormalizedCache;
export function writeSelectionSetToStore({result, dataId, selectionSet, store, variables, dataIdFromObject, fragmentMap}: {
    dataId: string;
    result: any;
    selectionSet: SelectionSet;
    store?: NormalizedCache;
    variables: Object;
    dataIdFromObject: IdGetter;
    fragmentMap?: FragmentMap;
}): NormalizedCache;
}
declare module 'apollo-client/data/writeToStore' {
export * from '~apollo-client/data/writeToStore';
}

// Generated by typings
// Source: node_modules/apollo-client/data/extensions.d.ts
declare module '~apollo-client/data/extensions' {
export type IdGetter = (value: Object) => string;
export const getIdField: (data: {
    id: any;
}) => any;
}
declare module 'apollo-client/data/extensions' {
export * from '~apollo-client/data/extensions';
}

// Generated by typings
// Source: node_modules/apollo-client/queries/queryTransform.d.ts
declare module '~apollo-client/queries/queryTransform' {
import { Document, SelectionSet } from 'graphql';
export type QueryTransformer = (selectionSet: SelectionSet) => void;
export function addFieldToSelectionSet(fieldName: string, selectionSet: SelectionSet): void;
export function addTypenameToSelectionSet(selectionSet: SelectionSet): void;
export function applyTransformers(doc: Document, queryTransformers: QueryTransformer[]): Document;
}
declare module 'apollo-client/queries/queryTransform' {
export * from '~apollo-client/queries/queryTransform';
}

// Generated by typings
// Source: node_modules/apollo-client/data/scopeQuery.d.ts
declare module '~apollo-client/data/scopeQuery' {
import { FragmentMap } from '~apollo-client/queries/getFromAST';
import { SelectionSet } from 'graphql';
export type StorePath = (string | number)[];
export function scopeJSONToResultPath({json, path}: {
    json: any;
    path: StorePath;
}): any;
export function scopeSelectionSetToResultPath({selectionSet, fragmentMap, path}: {
    selectionSet: SelectionSet;
    fragmentMap?: FragmentMap;
    path: StorePath;
}): SelectionSet;
}
declare module 'apollo-client/data/scopeQuery' {
export * from '~apollo-client/data/scopeQuery';
}

// Generated by typings
// Source: node_modules/apollo-client/data/mutationResults.d.ts
declare module '~apollo-client/data/mutationResults' {
import { NormalizedCache } from '~apollo-client/data/store';
import { GraphQLResult, SelectionSet, FragmentDefinition } from 'graphql';
import { FragmentMap } from '~apollo-client/queries/getFromAST';
import { StorePath } from '~apollo-client/data/scopeQuery';
import { ApolloReducerConfig } from '~apollo-client/store';
export type MutationBehavior = MutationArrayInsertBehavior | MutationArrayDeleteBehavior | MutationDeleteBehavior | MutationQueryResultBehavior;
export type MutationArrayInsertBehavior = {
    type: 'ARRAY_INSERT';
    resultPath: StorePath;
    storePath: StorePath;
    where: ArrayInsertWhere;
};
export type MutationDeleteBehavior = {
    type: 'DELETE';
    dataId: string;
};
export type MutationArrayDeleteBehavior = {
    type: 'ARRAY_DELETE';
    storePath: StorePath;
    dataId: string;
};
export type MutationQueryResultBehavior = {
    type: 'QUERY_RESULT';
    queryVariables: any;
    querySelectionSet: SelectionSet;
    queryFragments: FragmentDefinition[];
    newResult: Object;
};
export type ArrayInsertWhere = 'PREPEND' | 'APPEND';
export type MutationBehaviorReducerArgs = {
    behavior: MutationBehavior;
    result: GraphQLResult;
    variables: any;
    fragmentMap: FragmentMap;
    selectionSet: SelectionSet;
    config: ApolloReducerConfig;
};
export type MutationBehaviorReducerMap = {
    [type: string]: MutationBehaviorReducer;
};
export type MutationBehaviorReducer = (state: NormalizedCache, args: MutationBehaviorReducerArgs) => NormalizedCache;
export function cleanArray(originalArray: any, dataId: any): any;
export function mutationResultQueryResultReducer(state: NormalizedCache, {behavior, config}: MutationBehaviorReducerArgs): NormalizedCache;
export type MutationQueryReducer = (previousResult: Object, options: {
    mutationResult: Object;
    queryName: Object;
    queryVariables: Object;
}) => Object;
export type MutationQueryReducersMap = {
    [queryName: string]: MutationQueryReducer;
};
export const defaultMutationBehaviorReducers: {
    [type: string]: MutationBehaviorReducer;
};
}
declare module 'apollo-client/data/mutationResults' {
export * from '~apollo-client/data/mutationResults';
}

// Generated by typings
// Source: node_modules/apollo-client/index.d.ts
declare module '~apollo-client/index' {
import { NetworkInterface, createNetworkInterface, addQueryMerging } from '~apollo-client/networkInterface';
import { Document, FragmentDefinition } from 'graphql';
import { print } from 'graphql-tag/printer';
import { createApolloStore, ApolloStore, createApolloReducer, ApolloReducerConfig } from '~apollo-client/store';
import { QueryManager } from '~apollo-client/QueryManager';
import { ObservableQuery } from '~apollo-client/ObservableQuery';
import { WatchQueryOptions } from '~apollo-client/watchQueryOptions';
import { readQueryFromStore, readFragmentFromStore } from '~apollo-client/data/readFromStore';
import { writeQueryToStore, writeFragmentToStore } from '~apollo-client/data/writeToStore';
import { IdGetter } from '~apollo-client/data/extensions';
import { QueryTransformer, addTypenameToSelectionSet } from '~apollo-client/queries/queryTransform';
import { MutationBehavior, MutationBehaviorReducerMap, MutationQueryReducersMap } from '~apollo-client/data/mutationResults';
export { createNetworkInterface, addQueryMerging, createApolloStore, createApolloReducer, readQueryFromStore, readFragmentFromStore, addTypenameToSelectionSet as addTypename, writeQueryToStore, writeFragmentToStore, print as printAST };
export type ApolloQueryResult = {
    data: any;
    loading: boolean;
};
export let fragmentDefinitionsMap: {
    [fragmentName: string]: FragmentDefinition[];
};
export function createFragment(doc: Document, fragments?: (FragmentDefinition[] | FragmentDefinition[][])): FragmentDefinition[];
export function disableFragmentWarnings(): void;
export function enableFragmentWarnings(): void;
export function clearFragmentDefinitions(): void;
export default class ApolloClient {
    networkInterface: NetworkInterface;
    store: ApolloStore;
    reduxRootKey: string;
    initialState: any;
    queryManager: QueryManager;
    reducerConfig: ApolloReducerConfig;
    queryTransformer: QueryTransformer;
    shouldBatch: boolean;
    shouldForceFetch: boolean;
    dataId: IdGetter;
    fieldWithArgs: (fieldName: string, args?: Object) => string;
    batchInterval: number;
    constructor({networkInterface, reduxRootKey, initialState, dataIdFromObject, queryTransformer, shouldBatch, ssrMode, ssrForceFetchDelay, mutationBehaviorReducers, batchInterval}?: {
        networkInterface?: NetworkInterface;
        reduxRootKey?: string;
        initialState?: any;
        dataIdFromObject?: IdGetter;
        queryTransformer?: QueryTransformer;
        shouldBatch?: boolean;
        ssrMode?: boolean;
        ssrForceFetchDelay?: number;
        mutationBehaviorReducers?: MutationBehaviorReducerMap;
        batchInterval?: number;
    });
    watchQuery(options: WatchQueryOptions): ObservableQuery;
    query(options: WatchQueryOptions): Promise<ApolloQueryResult>;
    mutate(options: {
        mutation: Document;
        variables?: Object;
        resultBehaviors?: MutationBehavior[];
        fragments?: FragmentDefinition[];
        optimisticResponse?: Object;
        updateQueries?: MutationQueryReducersMap;
        refetchQueries?: string[];
    }): Promise<ApolloQueryResult>;
    reducer(): Function;
    middleware: () => (store: ApolloStore) => (next: any) => (action: any) => any;
    initStore(): void;
    private setStore(store);
}
}
declare module 'apollo-client/index' {
export * from '~apollo-client/index';
export { default } from '~apollo-client/index';
}
declare module 'apollo-client' {
export * from '~apollo-client/index';
export { default } from '~apollo-client/index';
}
