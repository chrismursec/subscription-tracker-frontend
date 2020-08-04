import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ChartsService {
	constructor(private http: HttpClient) {}

	private tagsUpdated = new Subject<{ tags: any; count: number; tagCount: any }>();
	private tags: [];
	private hostUrl: string = 'http://localhost:3000/api/statistics';

	getUsersTagData() {
		this.http
			.get<{ tags: any }>(this.hostUrl + '/tag-data')
			.pipe(
				map((tagData: any) => {
					return {
						tags: tagData.tags,
						count: tagData.count,
						tagCount: tagData.tagCount
					};
				})
			)
			.subscribe((tagData) => {
				this.tags = tagData.tags;
				this.tagsUpdated.next({
					tags: [ ...this.tags ],
					count: tagData.count,
					tagCount: tagData.tagCount
				});
			});
	}

	getUserTagsUpdateListener() {
		return this.tagsUpdated.asObservable();
	}
}
