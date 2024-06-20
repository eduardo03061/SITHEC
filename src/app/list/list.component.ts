import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private readonly apollo: Apollo) {}

  public characters!: any[];
  public paginate$!: any;
  currentPage = 1;

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters {
              results {
                id
                name
                status
                species
                image
              }
              info {
                count
                pages
                next
                prev
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log('result', result);

        this.characters = result.data.characters.results;
        this.paginate$ = result.data.characters.info;
      });
  }
  changePage(newPage: any) {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(page:${newPage}) {
              results {
                id
                name
                status
                species
                image
              }
              info {
                count
                pages
                next
                prev
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.paginate$ = result.data.characters.info;

        this.currentPage = newPage;
      });
  }
}
