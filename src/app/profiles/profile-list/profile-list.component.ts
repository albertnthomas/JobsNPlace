import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Profile } from "../profile.model";
import { ProfileService } from "../profile.service";

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy {

  profile: Profile[] = [];
  private profileSub: Subscription;

  constructor(public profileService: ProfileService) { }

  ngOnInit()  {
    this.profileService.getProfile();
    this.profileSub = this.profileService.getProfileUpdateListener()
      .subscribe((profileData: { profile: Profile[];}) => {
        this.profile = profileData.profile;

      });
    }
  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

}
