# app-minigames


## Sumário

- [Executar o projeto](#executando-o-projeto)
- [JSON Schemas dos jogos](#schemas)
- [Comandos úteis do github](#comandos-úteis-do-github)
- [Referências](#referências)

## Executando o projeto

1. Execute `npm install --force`.
2. Execute `npm run web`.

## JSON Schemas dos jogos

Os esquemas dos JSONs dos jogos estão localizados na pasta [src/db/schemas](./src/db/schemas/).

Utilize esses arquivos para validar os JSONs dos jogos e evitar erros de sintaxe. Além disso, você pode utilizar algum visualizador de esquema como o [JSON Schema Viewer](https://navneethg.github.io/jsonschemaviewer/) para compreender melhor a estrutura dos JSONs.

## Comandos úteis do github

### 1. Criar novo branch
```
git checkout -b nome-branch
```

### 2. Atualizar branch local
```
git pull
```

### 3. Configurar `user.name`

#### Configurar de forma global para a máquina:
```
git config --global user.name "primeiro_nome sobrenome"
```

#### Configurar especificamente para um repositório:
```
git config user.name "primeiro_nome sobrenome"
```

### 4. Configurar `user.email`

#### Configurar de forma global para a máquina:
```
git config --global user.email "nome@example.com"
```

#### Configurar especificamente para um repositório:
```
git config user.email "nome@example.com"
```

### 5. Função do `git push`
Serve para enviar os commits locais para um repositório remoto

### 6. Função do `git pull`
Usado para buscar e baixar conteúdo de repositórios remotos e fazer a atualização imediata ao repositório local para que os conteúdos sejam iguais

### 7. Fazer o checkout de uma branch existente
```
git checkout NOME-DA-BRANCH
```

### 8. Fazer o checkout para uma nova branch
```
git checkout -b NOME-DA-NOVA-BRANCH
```

### 9. Verificar qual é o branch atual
```
git branch --show-current
``` 

## Converter AAB para APK

Fazer o download do [bundletool](https://github.com/google/bundletool/releases).

Executar o comando:
```
java -jar bundletool-all-1.17.2.jar build-apks --bundle=/Users/gomide/Desktop/appMinigameBuild.aab --output=/Users/gomide/Desktop/appMinigame.apks --mode=universal
```

Renomear o arquivo `appMinigame.apks` para `appMinigame.zip` e descompactar.

## Referências
- [Gitbash](https://git-scm.com/downloads)
- [Bundletool - Converter AAB para APK](https://github.com/google/bundletool)