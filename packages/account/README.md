# Starter Files by [nx-clean](https://github.com/guiseek/nx-clean)

**Source**: <https://github.com/guiseek/nx-clean>

## [Docs](https://github.com/guiseek/nx-clean#docs=)

### Generators

- **Domain**: business rules lives here
- **Data**: our data access layer
- **Presentation**: data flow handling

### Packages

- **Core**: common abstractions, dependency injector...

## Commands

### Domain

```bash
nx generate @nx-clean/plugin-core:domain --name=domain --entity=user --directory=account  --repository --usecases --tags=type:domain,scope:account
```

### Data

```bash
nx generate @nx-clean/plugin-core:data --name=data-access --domain=account-domain --entity=user --directory=account --inmemory --tags=type:data,scope:account
```

### Presentation

```bash
nx generate @nx-clean/plugin-core:presentation --name=presentation --domain=account-domain --entity=user --directory=account --data=account-data-access --tags=type:presentation,scope:account
```
