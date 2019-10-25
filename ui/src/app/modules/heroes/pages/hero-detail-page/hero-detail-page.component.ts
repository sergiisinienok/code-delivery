import {ChangeDetectionStrategy,Component, OnInit, ViewChild, Input} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {RoutesConfig} from '../../../../configs/routes.config';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HeroService} from '../../shared/hero.service';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {UtilsHelperService} from '../../../../shared/services/utils-helper.service';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class HeroDetailPageComponent implements OnInit {

  @Input() hero: Hero;
  editHeroForm: FormGroup;
  error: boolean;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private heroService: HeroService,
              private i18n: I18n) {
                this.editHeroForm = this.formBuilder.group({
                  id: [''],
                  name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                  alterEgo: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                  // favoriteColor: [''],  // Favorite Colour 2
                  likes: [''],
                  default: [''],
                  avatarUrl: [''],
                  avatarBlurredUrl: [''],
                  avatarThumbnailUrl: ['']
                });

                this.onChanges();
  }

  ngOnInit() {
    this.hero = this.activatedRoute.snapshot.data.hero;
    this.editHeroForm.setValue(this.hero);
  }

  goBack(): void {
    this.location.back();
  }

  async editHero() {
    if (this.editHeroForm.valid) {
      this.heroService.updateHero(this.editHeroForm.value).then(() => {
        this.router.navigate(['/']);
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
    this.editHeroForm.get('avatarUrl').valueChanges.subscribe((value) => {
      this.hero.avatarUrl = value;
    });
    this.editHeroForm.get('avatarBlurredUrl').valueChanges.subscribe((value) => {
      this.hero.avatarBlurredUrl = value;
    });
    // Favorite Colour 2
    // this.editHeroForm.get('favoriteColor').valueChanges.subscribe((value) => {
    //   this.hero.favoriteColor = value;
    // });
    // ==========
  }
}
