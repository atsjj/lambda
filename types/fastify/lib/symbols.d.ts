declare const symbols: symbols.Symbols;

declare namespace symbols {
  interface Symbols {
    kChildren: symbol;
    kBodyLimit: symbol;
    kRoutePrefix: symbol;
    kLogLevel: symbol;
    kLogSerializers: symbol;
    kHooks: symbol;
    kSchemas: symbol;
    kValidatorCompiler: symbol;
    kSerializerCompiler: symbol;
    kReplySerializerDefault: symbol;
    kContentTypeParser: symbol;
    kReply: symbol;
    kRequest: symbol;
    kCanSetNotFoundHandler: symbol;
    kFourOhFour: symbol;
    kFourOhFourLevelInstance: symbol;
    kFourOhFourContext: symbol;
    kDefaultJsonParse: symbol;
    kReplySerializer: symbol;
    kReplyIsError: symbol;
    kReplyHeaders: symbol;
    kReplyHasStatusCode: symbol;
    kReplySent: symbol;
    kReplySentOverwritten: symbol;
    kReplyStartTime: symbol;
    kReplyErrorHandlerCalled: symbol;
    kReplyIsRunningOnErrorHook: symbol;
    kState: symbol;
    kOptions: symbol;
    kDisableRequestLogging: symbol;
    kPluginNameChain: symbol;
  }
}

export = symbols;


