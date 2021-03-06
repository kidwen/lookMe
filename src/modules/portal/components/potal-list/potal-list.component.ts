import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AudioInfo, AudioSearch, HttpService, InteractionService } from '@kidwen/shared';

@Component({
    selector: 'app-potal-list',
    templateUrl: './potal-list.component.html',
    styleUrls: ['./potal-list.component.scss'],
})

export class PotalListComponent {

    public audioUrls: Array<string> = new Array<string>();

    public currentPosition: number = 0;

    public kw?: string;

    public audios?: Array<AudioInfo>;

    private currentPage: number = 1;

    public constructor(
        private interaction: InteractionService,
        private http: HttpService,
        private navController: NavController,
        private route: ActivatedRoute,
    ) {
    }

    public async showTrack(audio: AudioInfo): Promise<void> {
        await this.navController.navigateForward([audio.audioId], { relativeTo: this.route });
    }

    public async search(): Promise<void> {
        if (!this.kw) {
            return;
        }
        try {
            const res: AudioSearch = await this.http.get<AudioSearch>(`audio/search`, this.kw, '', { page: this.currentPage.toString() });
            this.audios = res?.audio_list;
        } catch (e) {
            await this.interaction.toast(`凉凉${(e as Error).message}`);
        }
    }
}
