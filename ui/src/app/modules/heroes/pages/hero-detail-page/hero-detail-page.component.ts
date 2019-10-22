import {Component, OnInit} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {RoutesConfig} from '../../../../configs/routes.config';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HeroService} from '../../shared/hero.service';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class HeroDetailPageComponent implements OnInit {

  hero: Hero;
  editHeroForm: FormGroup;
  error: boolean;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private heroService: HeroService) {
                this.editHeroForm = this.formBuilder.group({
                  name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                  alterEgo: new FormControl('', [Validators.required, Validators.maxLength(30)])
                });

                this.onChanges();
  }

  ngOnInit() {
    this.hero = this.activatedRoute.snapshot.data.hero;
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([RoutesConfig.routes.heroes.detail(this.hero.id)], {fragment: 'heroe-detail'});
  }

  async editHero() {
    if (this.editHeroForm.valid) {
      this.heroService.createHero(new Hero(this.editHeroForm.value)).then(() => {
        this.myNgForm.resetForm();
        this.snackBar.open(this.i18n({value: 'Hero created', id: '@@heroCreated'}), '', {duration: 1000});
      }, () => {
        this.error = true;
      });
    }
  }

  private onChanges() {
    this.editHeroForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open(this.i18n({value: 'Yeah that\'s a Palindrome!', id: '@@yeahPalindrome'}), '', {duration: 2000});
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
