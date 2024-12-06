import { Global, Module, Provider } from '@nestjs/common';
import { TransactionManagerService } from './services/transaction-manager.service';
import { ApiConfigService } from './services/api-config.service';

const providers: Provider[] = [TransactionManagerService, ApiConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
