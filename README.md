# Voraussetzungen

1. **[Node.js](https://nodejs.org/en/docs)**: Stelle sicher, dass Node.js auf deinem System installiert ist. 
2. **[Docker](https://docs.docker.com/get-docker/)**: Stelle sicher, dass Docker auf deinem Computer installiert ist.

# Installation und Ausführung 

## Schritt 1: Navigiere in das Projektverzeichnis

Öffne die Konsole und navigiere in das Projektverzeichnis. Gib in der Konsole folgendes ein:

```shell
cd /path/to/folder/e-mobility
```

## Schritt 2: Installiere alle benötigten dependencies

Gib in der Konsole folgenden Befehl im Projektverzeichnis ein:

```shell
docker compose up 
```

bzw. nach Änderungen 

```shell
docker compose up --build
```

Eine Übersicht über alle Flags und deren Funktionen findest du hier: [docker compose up documentation](https://docs.docker.com/engine/reference/commandline/compose_up/)


## 3. Erreichbarkeit 

Das Backend läuft auf dem in der ``docker-compose.yml`` spezifizierten Port (5555). Der Port kann in der Datei auf Wunsch angepasst werden, erfordert dann aber unter Umständen Anpassungen im Frontend.
