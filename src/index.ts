import { Event, events } from '@brigadecore/brigadier';
import * as slack from '@slack/bolt';
import * as slackapi from '@slack/web-api';

export class SlackEvents {
    onSlashCommand(action: (command: slack.SlashCommand, slackClient: slackapi.WebClient, event: Event) => Promise<void>): void {
        events.on('slack', 'slash_command', async (event) => {
            const payload = JSON.parse(event.payload || '');
            const command: slack.SlashCommand = payload.body;
            const responseToken: string = payload.responseToken;
            const slackClient = new slackapi.WebClient(responseToken);
            await action(command, slackClient, event);
        });
    }

    onShortcut(action: (shortcut: slack.GlobalShortcut, slackClient: slackapi.WebClient, event: Event) => Promise<void>): void {
        events.on('slack', 'shortcut', async (event) => {
            const payload = JSON.parse(event.payload || '');
            const shortcut: slack.GlobalShortcut = payload.body;
            const responseToken: string = payload.responseToken;
            const slackClient = new slackapi.WebClient(responseToken);
            await action(shortcut, slackClient, event);
        });
    }

    onMessageAction(action: (shortcut: slack.MessageShortcut, slackClient: slackapi.WebClient, event: Event) => Promise<void>): void {
        events.on('slack', 'message_action', async (event: Event) => {
            const payload = JSON.parse(event.payload || '');
            const shortcut: slack.MessageShortcut = payload.body;
            const responseToken: string = payload.responseToken;
            const slackClient = new slackapi.WebClient(responseToken);
            await action(shortcut, slackClient, event);
        });
    }
}

export const slackEvents = new SlackEvents();
