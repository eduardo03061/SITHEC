import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './characterDetails.component.html',
  styleUrl: './characterDetails.component.css',
})
export class CharacterDetailsComponent {
  constructor(private route: ActivatedRoute, private readonly apollo: Apollo) {}
  public id: null | string = '';
  character!: any;
  createdAt!: any;
  episodes!: any;
  location!: any;
  origin!: any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.apollo
      .watchQuery({
        query: gql`
          {
            character(id:${this.id}){
                name
                species
                type
                gender
                origin {
                  id
                  name
                }
                location {
                  id
                  name
                  type
                }
                image
                episode {
                  id
                  name
                }
                created
              }
            }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        let {
          name,
          species,
          type,
          gender,
          image,
          created,
          episode,
          location,
          origin,
        } = result.data.character;

        created = new Date(created).toLocaleString();
        this.character = { name, species, type, gender, image, created };
        this.episodes = episode;
        this.location = location;
        this.origin = origin;
      });
  }
}
