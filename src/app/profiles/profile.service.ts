import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Profile } from "./profile.model";

@Injectable({ providedIn: "root" })

export class ProfileService {
  private profile: Profile[] = [];
  private profileUpdated = new Subject<{ profile: Profile[]; }>();

  constructor(private http: HttpClient, private router: Router) {}



  getProfile() {
    this.http
      .get<{ message: string; user: any }>(
        "http://localhost:3000/api/user"
      )
      .pipe(map((profileData) => {
        return profileData.user.map(profile => {
          return {
            candidateName: profile.candidateName,
            email: profile.email,
            id: profile._id,
            password:profile.password,
            mobile: profile.mobile,
            experience: profile.experience,
            technology: profile.technology
          };
        });
      }))
      .subscribe(transformedProfile => {
        this.profile = transformedProfile;
        this.profileUpdated.next({

          profile: [...this.profile]
      });
    });
  }
  getProfileUpdateListener() {
    return this.profileUpdated.asObservable();
  }

}
