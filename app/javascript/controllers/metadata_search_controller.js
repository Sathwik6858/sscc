import { Controller } from '@hotwired/stimulus';
import { get } from "@rails/request.js"

export const string_identifier = 'metadatasearch';

export default class extends Controller {
    static targets = ["name", "nameinput"];
	static values = {
		type: String,
		url: String
	}

	onSearchInput(event) {
        this.nameinputTarget.value = event.target.value;
		this.autoComplete(event.target.value);
	}

	onClear() {
		this.nameTarget.value = "";
		this.nameinputTarget.value = "";
		this.autoComplete("");
	}

	autoComplete(search){
		let params = new URLSearchParams();

		params.append("target", `metadataTable_${this.typeValue}`);
		params.append("search", search);

		get(`${this.urlValue}?${params}`, {
			responseKind: "turbo-stream", 
		})
	}
}