import { Event, events } from '@brigadecore/brigadier';
import slack from '@slack/bolt';

export class SlackEvents {
    onSlashCommand(action: (command: slack.SlashCommand, responseToken: string, event: Event) => Promise<void>): void {
        events.on('slack', 'slash_command', async (event) => {
            const payload = JSON.parse(event.payload || '');
            const command: slack.SlashCommand = payload.body;
            const responseToken: string = payload.responseToken;
            await action(command, responseToken, event);
        });
    }

    onShortcut(action: (shortcut: slack.GlobalShortcut, responseToken: string, event: Event) => Promise<void>): void {
        events.on('slack', 'shortcut', async (event) => {
            const payload = JSON.parse(event.payload || '');
            const shortcut: slack.GlobalShortcut = payload.body;
            const responseToken: string = payload.responseToken;
            await action(shortcut, responseToken, event);
        });
    }

    onMessageAction(action: (shortcut: slack.MessageShortcut, responseToken: string, event: Event) => Promise<void>): void {
        events.on('slack', 'message_action', async (event: Event) => {
            const payload = JSON.parse(event.payload || '');
            const shortcut: slack.MessageShortcut = payload.body;
            const responseToken: string = payload.responseToken;
            await action(shortcut, responseToken, event);
        });
    }
}

export const slackEvents = new SlackEvents();
